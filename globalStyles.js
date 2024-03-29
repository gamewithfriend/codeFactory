import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import colors from './assets/colors/colors';
import { block } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const {height:SCREEN_HEIGHT} = Dimensions.get('window');
// const fontSize = {
//   xlg: SCREEN_WIDTH > 500 ? 26 : 24,
//   lg: SCREEN_WIDTH > 500 ? 24 : 22,
//   md: SCREEN_WIDTH > 500 ? 20 : 16,
//   sm: SCREEN_WIDTH > 500 ? 14 : 13,
//   xsm: SCREEN_WIDTH > 500 ? 13 : 12,
// };

export const glStyles = StyleSheet.create({
  // 광고
  adver: {
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  adverText: {
    color: colors.fontWh,
    fontSize: 14,
    textAlign: "right"
  },
  // 배경색 일괄적용 안되는 경우   
  bgDarkGray: {
    backgroundColor: "#111"
  },
  showGroup: {//개발용
    backgroundColor: "#333",
  },
  // 패딩 설정
  pd5: {
    padding: 5
  },
  pd15: {
    padding: 15
  },
  pd20: {
    padding: 20
  },
  pdHrzn10: {
    paddingHorizontal: 10,
  },
  pdHrzn15: {
    paddingHorizontal: 15,
  },
  pdHrzn20: {
    paddingHorizontal: 20,
  },
  pdR10: { paddingRight: 10, },
  pdVrtcl10: {
    paddingVertical: 10
  },
  pdVrtcl15: {
    paddingVertical: 15
  },
  pdVrtcl20: {
    paddingVertical: 20
  },
  // 마진 설정
  mgTop5: {
    marginTop: 5
  },
  mgL5: {
    marginLeft: 10
  },
  mgR20: {
    marginRight: 20
  },
  mgBt5: {
    marginBottom: 5
  },
  mgbt10: {
    marginBottom: 10
  },
  mgbt20: {
    marginBottom: 20
  },
  mgVrtcl20: {
    marginVertical: 20
  },
  // flexbox 설정
  flexContainer: { flex: 1 },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  flexRow: {
    flexDirection: "row",
  },
  flexRowBtwn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexRowBtwnCntr: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRowStrt: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  flexRowStrtCntr: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flexRowEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  flexRowEven: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  flexRowEvenCntr: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  //grow 설정
  flexGrow1: { flexGrow: 1, },
  // 글자설정
  pageTit: {
    fontWeight: "bold",
    fontSize: 22,
    color: colors.fontWh,
  },
  titleBox: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  titleBoxIcon: {
    paddingLeft: 20,
    paddingBottom: 20,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 16,
    color: colors.fontWh,
  },
  titleTextBg: {
    fontSize: 20,
    color: colors.fontWh,
  },
  basicText: {
    fontSize: 14,
    color: colors.fontWh,
  },
  basicTextSm: {
    fontSize: 10,
    color: colors.fontWh,
  },
  champText: {
    fontSize: 10,
    color: colors.fontWh,
    textAlign: 'center',
  },
  txtAlignCntr: { textAlign: "center" },
  lh15: { lineHeight: 1.5},
  // input 설정
  inptBasic: {
    width: "100%",
    color: colors.fontWh,
    borderBottomWidth: 1,
    borderBottomColor: colors.fontWh,

  },
  // 버튼 설정
  btnBox: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btnBox2: {
    padding: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btnBox3: {
    padding: 20,
    paddingTop: 3,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btnMd: {
    paddingVertical: 15,
    paddingHorizontal: 30,    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnSm: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: colors.fontWh,
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnTextSm: {
    color: colors.fontWh,
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnBlue: {
    backgroundColor: colors.lightBlue,
  },

  // 메인 화면 슬라이드
  slideList: {
    marginBottom: 20,
    // backgroundColor: '#000',
  },
  slideItems: {
    marginTop: 10,
    // width: SCREEN_WIDTH,
    justifyContent: "center",
  },
  slideImgBox: {
    width: SCREEN_WIDTH * 1,
    height: SCREEN_WIDTH * 0.43,
    alignItems: "center",
    flexDirection: "row",
  },
  slideImgBox2: {
    width: SCREEN_WIDTH * 1,
    height: SCREEN_WIDTH * 0.43,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  slideImg: {
    width: '100%',
    height: "100%",
  },
  slideImg2: {
    width: '100%',
    height: "100%",
    opacity: 0.6,
    position: 'absolute',
    borderRadius: 45,
  },
  // 친구목록 스크롤
  friendList: {
    height: SCREEN_HEIGHT * 0.4,
  },

  // 카드 리스트
  cardList: {
    width: SCREEN_WIDTH - 20,
  },
  cardItems: {
    borderRadius: 45,
    width: 120,
    height: 120,
    marginBottom: 9,
  },
  cardLabel: {
    paddingTop: 5,
    paddingRight: 5,
    textAlign: "right",
    color: colors.fontWh,
  },
  cardInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 1,
  },
  cardIcon: {
    color: colors.fontWh,
  },

  // 기본 리스트 스타일
  basicList: {
    paddingTop: 15,
    paddingHorizontal: 15
  },
  basicItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPartLine: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: colors.fontWh
  },
  basicItemImg: {
    width: 52,
    height: 52,
  },

  basicItemImgLg: {
    width: 84,
    height: 84,
  },
  basicItemImgSm: {
    width: "20%",
    height: "100%",
  },
  basicItemImgSm2: {
    width: 26,
    height: 26,
  },
  basicItemInfo: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 3,
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  basicInfoTit: {
    fontSize: 16,
    color: colors.fontWh,
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  basicInfoDttm: {
    color: colors.fontWh,
    fontSize: 13,
  },
  basicInfoCntn: {
    width: "100%",
    color: colors.fontWh,
    fontSize: 14
  },

  // 마진 view 스타일
  justMarginLeft: {
    marginLeft: "3%",
  },
  // flexDirection: 'row', view 스타일
  justFlexDirectionRow: {
    marginLeft: "3%",
    flexDirection: 'row',
  },

  // 프랜즈 모달
  modalView: {
    margin: 20,
    height: SCREEN_HEIGHT-100,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    top: 0,
    bottom: 100,
    left: 20,
    right: 20,
  },
  modalImgView: {
    alignItems:"center"
  },
  modalImg: {
    borderRadius: (SCREEN_WIDTH-200)/2,
    width: SCREEN_WIDTH-200,
    height: SCREEN_WIDTH-200,
  },
});

