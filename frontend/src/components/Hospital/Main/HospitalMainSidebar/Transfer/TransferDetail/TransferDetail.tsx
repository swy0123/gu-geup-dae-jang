import { useRecoilState, useSetRecoilState } from "recoil";
import { ItemParaType, ItemRequestAt } from "../TransferListItem/TransferListItem.style";
import {
  CloseDiv,
  DetailItemContainer,
  ItemElapseMin,
  ItemAddr,
  TransferDetailContainer,
  TransferDetailContent,
  DetailItemBetween,
  ItemLeftTime,
} from "./TransferDetail.style";
import A from "/src/components/Commons/Atoms";
import theme from "/src/styles";
import { hospitalTransferList } from "/src/recoils/HospitalAtoms";
import { HospitalTransferItem } from "/src/types/map";

const TransferDetail = (props: any) => {
  const [transferList, setTransferList] = useRecoilState(hospitalTransferList);

  const clickButton = () => {
    if(transferList!=undefined){
      let nextTransferList = transferList.filter((item:HospitalTransferItem) => item.id!=props.id);
      setTransferList(nextTransferList);
    }
  };
  return (
    <TransferDetailContainer>
      <TransferDetailContent>
        <DetailItemContainer>
          <A.DivKtasInfo
            $position="absolute"
            $right="0%"
            $top="0%"
            $ktas={props.data.ktas.toLowerCase()}
            $width="50px"
            $height="25px"
            $borderRadius="0px 0px 0px 10px"
            $fontSize={theme.font.Small5_12}
          >
            {props.data.ktas}
          </A.DivKtasInfo>
          <ItemRequestAt>-</ItemRequestAt>
          <DetailItemBetween>
            <ItemParaType>
              {props.data.ageGroup} {props.data.gender}
            </ItemParaType>
            <ItemElapseMin>요청 대기 -분 경과</ItemElapseMin>
          </DetailItemBetween>

          <div style={{ width: "90%", margin: "0 auto" }}>
            {props.data.tags.map((item: string, index: number) => (
              <A.DivTag
                key={index}
                $margin="2px 5px 10px 2px"
                $width="fit-content"
                $height="18px"
                $borderRadius="5px"
                $textAlign="center"
                $padding="2px"
                $fontSize={theme.font.Small5_12}
              >
                {item}
              </A.DivTag>
            ))}
          </div>

          {/* <video style={{ border: "1px solid gray" }}></video> */}

          <div style={{ width: "90%", margin: "0 auto" }}>
            {props.data.files.map((item: string, index: number) => (
              <img key={index} src={item}></img>
            ))}
          </div>

          <ItemAddr>{props.data.description}</ItemAddr>
          <ItemAddr>{props.data.address}</ItemAddr>
          <DetailItemBetween>
            <ItemElapseMin>{props.data.distance} km</ItemElapseMin>
            <ItemLeftTime>{props.data.duration}분 이내 도착 가능</ItemLeftTime>
          </DetailItemBetween>

          {props.state == "transfer" ?
            <A.DivTag
              $width="100%"
              $height="50px"
              $position="absolute"
              $left="0%"
              $bottom="0%"
              $color={theme.color.white}
              $borderRadius="0px"
              $fontSize={theme.font.Small1_16}
              $backgroundColor={theme.color.blue}
              $boxShadow=""
            >
              {3}분 이내 도착 예정
            </A.DivTag> : <></>}
          {props.state == "wait" ?
            <A.DivTag
              $width="100%"
              $height="50px"
              $position="absolute"
              $left="0%"
              $bottom="0%"
              $color={theme.color.black}
              $borderRadius="0px"
              $fontSize={theme.font.Small1_16}
              $backgroundColor={theme.color.ktas3_Active}
              $boxShadow="0"
            >
              대기중
            </A.DivTag> : <></>}
          {props.state == "complete" ?
            <A.DivTag
              $width="100%"
              $height="50px"
              $position="absolute"
              $left="0%"
              $bottom="0%"
              $color={theme.color.white}
              $borderRadius="0px"
              $fontSize={theme.font.Small1_16}
              $backgroundColor={theme.color.ktas4_Active}
              $boxShadow="0"
              onClick={clickButton}
            >
              완료됨(눌러서 제거)
            </A.DivTag> : <></>}
          {props.state == "cancel" ?
            <A.DivTag
              $width="100%"
              $height="50px"
              $position="absolute"
              $left="0%"
              $bottom="0%"
              $color={theme.color.white}
              $borderRadius="0px"
              $fontSize={theme.font.Small1_16}
              $backgroundColor={theme.color.ktas2_Active}
              $boxShadow="0"
              onClick={clickButton}
            >
              취소됨(눌러서 제거)
            </A.DivTag> : <></>}
        </DetailItemContainer>
      </TransferDetailContent>
      <CloseDiv onClick={props.onclick}>&lt;</CloseDiv>
    </TransferDetailContainer>
  );
};

export default TransferDetail;

// id: number,
// addr: string,
// pos: Position,
// ktas: string,
// elapseMin: number,
// leftTime: number,
// paraType: string,
// paraTag: string[],
// paraInfo: string,
// requestAt?: string,