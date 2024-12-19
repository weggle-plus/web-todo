const TeamService = require('../../../src/services/TeamService');
const ServiceError = require('../../../src/utils/errors/ServiceError');
const { TEAM_MEMBER_ROLES } = require('../../../src/models/interfaces/TeamSchema');

describe('TeamService', () => {
  let teamService;
  let mockTeamRepository;
  let mockUserRepository;
  
  const mockUser = {
    id: 1,
    email: 'test@test.com',
    username: '테스트유저'
  };

  const mockTeam = {
    id: 1,
    name: '테스트 팀',
    description: '테스트 팀 설명',
    createdBy: mockUser.id,
    members: [
      {
        id: mockUser.id,
        email: mockUser.email,
        username: mockUser.username,
        UserTeam: {
          role: TEAM_MEMBER_ROLES.MANAGER
        }
      }
    ]
  };

  beforeEach(() => {
    mockTeamRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByTeamId: jest.fn(),
      findByUserId: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      inviteMember: jest.fn(),
      acceptInvitation: jest.fn(),
      rejectInvitation: jest.fn(),
      addMember: jest.fn(),
      getMembers: jest.fn(),
      getMemberRole: jest.fn(),
      updateMemberRole: jest.fn(),
      removeMember: jest.fn()
    };

    mockUserRepository = {
      findByUserId: jest.fn(),
      findById: jest.fn()
    };

    teamService = new TeamService(mockTeamRepository, mockUserRepository);
  });

  describe('createTeam', () => {
    const teamData = {
      name: '새로운 팀',
      description: '새로운 팀 설명'
    };

    it('새로운 팀을 생성할 수 있다', async () => {
      mockUserRepository.findByUserId.mockResolvedValue(mockUser);
      mockTeamRepository.create.mockResolvedValue({ id: 2, ...teamData });
      mockTeamRepository.addMember.mockResolvedValue(true);

      const result = await teamService.createTeam(teamData, mockUser.id, TEAM_MEMBER_ROLES.MANAGER);

      expect(mockTeamRepository.create).toHaveBeenCalledWith(teamData);
      expect(mockTeamRepository.addMember).toHaveBeenCalledWith(expect.any(Number), mockUser.id, TEAM_MEMBER_ROLES.MANAGER);
      expect(result).toMatchObject(teamData);
    });

    it('존재하지 않는 사용자가 팀 생성시 에러가 발생한다', async () => {
      mockUserRepository.findByUserId.mockResolvedValue(null);

      await expect(
        teamService.createTeam(teamData, 999)
      ).rejects.toThrow(ServiceError);
    });
  });

  describe('inviteMember', () => {
    it('팀에 새로운 멤버를 초대할 수 있다', async () => {
      mockTeamRepository.inviteMember.mockResolvedValue(true);
      mockUserRepository.findByUserId.mockResolvedValue({ id: 2 });

      await teamService.inviteMember(mockTeam.id, 2);

      expect(mockTeamRepository.inviteMember).toHaveBeenCalledWith(mockTeam.id, 2);
    });

    it('존재하지 않는 사용자를 초대시 에러가 발생한다', async () => {
      mockUserRepository.findByUserId.mockResolvedValue(null);

      await expect(
        teamService.inviteMember(mockTeam.id, 999)
      ).rejects.toThrow(ServiceError);
    });
  });

  describe('getTeam', () => {
    it('팀 정보를 조회할 수 있다', async () => {
      mockTeamRepository.findByTeamId.mockResolvedValue(mockTeam);

      const result = await teamService.getTeam(mockTeam.id);

      expect(result).toEqual(mockTeam);
    });

    it('존재하지 않는 팀 조회시 에러가 발생한다', async () => {
      mockTeamRepository.findByTeamId.mockResolvedValue(null);

      await expect(
        teamService.getTeam(999)
      ).rejects.toThrow(ServiceError);
    });
  });

  describe('getUserTeams', () => {
    it('사용자가 속한 모든 팀을 조회할 수 있다', async () => {
      const mockTeams = [mockTeam];
      mockTeamRepository.findByUser.mockResolvedValue(mockTeams);

      const result = await teamService.getUserTeams(mockUser.id);

      expect(result).toEqual(mockTeams);
    });
  });

  describe('updateTeam', () => {
    const updateData = {
      name: '수정된 팀명',
      description: '수정된 설명'
    };

    it('팀 정보를 수정할 수 있다', async () => {
      mockTeamRepository.update.mockResolvedValue({ ...mockTeam, ...updateData });

      const result = await teamService.updateTeam(mockTeam.id, updateData);

      expect(mockTeamRepository.update).toHaveBeenCalledWith(mockTeam.id, updateData);
      expect(result).toMatchObject(updateData);
    });
  });

  describe('addMember', () => {
    it('팀에 새로운 멤버를 추가할 수 있다', async () => {
      const newMemberId = 2;
      mockTeamRepository.addMember.mockResolvedValue(true);

      await teamService.addMember(mockTeam.id, newMemberId, TEAM_MEMBER_ROLES.MEMBER);

      expect(mockTeamRepository.addMember).toHaveBeenCalledWith(
        mockTeam.id,
        newMemberId,
        TEAM_MEMBER_ROLES.MEMBER
      );
    });

    it('잘못된 역할로 멤버 추가시 에러가 발생한다', async () => {
      await expect(
        teamService.addMember(mockTeam.id, 2, 'INVALID_ROLE')
      ).rejects.toThrow(ServiceError);
    });
  });

  describe('updateMemberRole', () => {
    it('팀 멤버의 역할을 변경할 수 있다', async () => {
      mockTeamRepository.updateMemberRole.mockResolvedValue(true);

      await teamService.updateMemberRole(mockTeam.id, mockUser.id, TEAM_MEMBER_ROLES.MENTOR);

      expect(mockTeamRepository.updateMemberRole).toHaveBeenCalledWith(
        mockTeam.id,
        mockUser.id,
        TEAM_MEMBER_ROLES.MENTOR
      );
    });

    it('잘못된 역할로 변경시 에러가 발생한다', async () => {
      await expect(
        teamService.updateMemberRole(mockTeam.id, mockUser.id, 'INVALID_ROLE')
      ).rejects.toThrow(ServiceError);
    });
  });

  describe('removeMember', () => {
    it('팀에서 멤버를 제거할 수 있다', async () => {
      mockTeamRepository.removeMember.mockResolvedValue(true);

      await teamService.removeMember(mockTeam.id, mockUser.id);

      expect(mockTeamRepository.removeMember).toHaveBeenCalledWith(mockTeam.id, mockUser.id);
    });
  });

  describe('deleteTeam', () => {
    it('팀을 삭제할 수 있다', async () => {
      mockTeamRepository.delete.mockResolvedValue(true);

      await teamService.deleteTeam(mockTeam.id);

      expect(mockTeamRepository.delete).toHaveBeenCalledWith(mockTeam.id);
    });

    it('존재하지 않는 팀 삭제시 에러가 발생한��', async () => {
      mockTeamRepository.delete.mockRejectedValue(new Error());

      await expect(
        teamService.deleteTeam(999)
      ).rejects.toThrow();
    });
  });
}); 