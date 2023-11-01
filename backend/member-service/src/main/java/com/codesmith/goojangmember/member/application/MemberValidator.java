package com.codesmith.goojangmember.member.application;

import com.codesmith.goojangmember.member.exception.MemberNotFoundException;
import com.codesmith.goojangmember.member.exception.NoNearByHospitalException;
import com.codesmith.goojangmember.member.exception.SafetyCenterNotFoundException;
import com.codesmith.goojangmember.member.persistence.MemberRepository;
import com.codesmith.goojangmember.member.persistence.SafetyCenterRepository;
import com.codesmith.goojangmember.member.persistence.domain.HospitalDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MemberValidator {
    private final MemberRepository memberRepository;
    private final SafetyCenterRepository safetyCenterRepository;

    public void validateMemberId(Long memberId) {
        if (!memberRepository.existsById(memberId)) {
            throw new MemberNotFoundException("없는 사용자 ID");
        }
    }

    public void validateSafetyCenterId(Long safetyCenterId) {
        if (!safetyCenterRepository.existsById(safetyCenterId)) {
            throw new SafetyCenterNotFoundException("없는 안전센터 ID");
        }
    }

    public void doesEmailExist(String email) {
        if (!memberRepository.existsByEmail(email)) {
            throw new SafetyCenterNotFoundException("없는 이메일");
        }
    }

    public void validateExistNearByHospital(List<HospitalDetail> hospitalList) {
        if (hospitalList.isEmpty()) {
            throw new NoNearByHospitalException("주변에 갈 수 있는 병원이 없음");
        }
    }
}
