
import { StoryChapter } from './types';

export const STORY_TITLE = "반짝이와 상상 스케치북";

export const STICKERS = [
  { icon: '🦄', name: '마법 뿔' },
  { icon: '🦋', name: '나비 날개' },
  { icon: '🤖', name: '로봇 다리' },
  { icon: '🌈', name: '무지개 꼬리' },
  { icon: '⭐', name: '반짝이' },
  { icon: '👀', name: '큰 눈' },
  { icon: '🔥', name: '불꽃' },
  { icon: '🎨', name: '물감' }
];

export const getChapters = (childName: string): StoryChapter[] => [
  {
    title: "제1장: 빛나는 네모 속의 마법",
    text: `어느 조용한 밤이었어요. 주인공 '${childName}'는 침대 위에서 네모난 휴대폰 화면을 멍하니 바라보고 있었죠.\n\n화면 속에는 형광색 뿔이 세 개 달린 우주 괴물이 춤을 추고 있었어요.\n\n"우와, 신기하다..."\n\n${childName}는 화면에서 눈을 떼지 못했어요. AI가 보여주는 신비로운 모습에 마음을 다 뺏겨버렸거든요. 주변은 깜깜했지만, ${childName}의 얼굴은 휴대폰 빛으로만 파랗게 빛나고 있었어요.`,
    imagePrompt: `A child named ${childName} with facial features from the photo, sitting on a bed in a dark cozy room, staring at a glowing smartphone screen. CRITICAL: The child's face MUST have a blank, entranced, and spaced-out expression (멍한 표정, 무표정). On the screen is a small neon alien. The child's face is lit by blue screen light. Soft storybook watercolor style.`
  },
  {
    title: "제2장: 똑같은 괴물들",
    text: `다음 날, ${childName}는 바닥에 엎드려 그림을 그리기 시작했어요. 그런데 이상하죠? ${childName}가 그린 그림들은 어제 휴대폰에서 본 괴물과 똑같았어요.\n\n뿔이 세 개, 초록색 몸통... 첫 번째 종이에도, 두 번째 종이에도, 세 번째 종이에도 똑같은 괴물들뿐이었죠. ${childName}는 그저 화면에서 본 것을 그대로 옮겨 그리기만 했어요. 멍하니 그림을 그리던 ${childName}의 얼굴엔 즐거움보다는 지루함이 살짝 서려 있었답니다.`,
    imagePrompt: `The same child ${childName} lying on the wooden floor, drawing many identical green aliens. The child looks bored and tired. Storybook watercolor style, bright room.`
  },
  {
    title: "제3장: '생각 모자'를 쓴 아이",
    text: `그때, 옆집에 사는 친구가 놀러 왔어요. 친구는 머리에 멋진 '생각 모자'를 쓰고 있었죠. 친구도 AI가 보여준 우주 괴물을 알고 있었지만, 친구의 도화지는 전혀 달랐어요.\n\n"내 괴물은 날개가 달려서 우주를 쌩쌩 날아다녀!" "내 괴물은 눈이 하나지만 아주 멀리까지 볼 수 있지!"\n\n친구는 AI가 알려준 모습에 자신만의 상상력을 더해 세상에 없던 새로운 괴물들을 만들어내고 있었어요. 친구의 얼굴은 새로운 것을 만들어내는 기쁨으로 반짝반짝 빛나고 있었답니다.`,
    imagePrompt: `A friend wearing a creative colorful hat showing unique alien drawings to ${childName}. ${childName} looks surprised and intrigued. Storybook style illustration.`
  },
  {
    title: "제4장: 나만의 우주를 만들자!",
    text: `그 모습을 본 ${childName}의 눈이 커졌어요.\n\n"아하! 꼭 똑같이 그릴 필요는 없구나? 나도 내 생각을 더해볼래!"\n\n${childName}는 이제 화면을 끄고 연필을 잡았어요. AI가 보여준 초록색 괴물에게 멋진 로봇 다리를 그려주고, 무지개색 꼬리도 달아주었죠. 그러자 도화지 속 괴물이 살아 움직이는 것 같았어요! 이제 ${childName}는 더 이상 멍하니 화면만 보던 아이가 아니었어요.`,
    imagePrompt: `The child ${childName} drawing with high energy and creative excitement. The paper shows a unique alien starting to take shape. Storybook style, vibrant art supplies around.`,
    allowDecoration: true
  },
  {
    title: "제5장: 우리들의 상상 놀이터",
    text: `이제 ${childName}와 친구들이 마루바닥에 다 같이 모여 앉았어요. 모두가 각기 다른 모양의 우주 괴물을 그리고 있었죠. 어떤 괴물은 꽃을 좋아하고, 어떤 괴물은 노래를 불러요.\n\nAI는 우리에게 멋진 아이디어를 먼저 제안해주지만, 그 아이디어에 색깔을 입히고 생명력을 불어넣는 건 바로 '우리들의 멋진 생각'이라는 걸 알게 되었답니다.`,
    imagePrompt: `CRITICAL: The child ${childName} from the photo MUST have a huge, bright, joyful smile (환하게 웃는 표정) with sparkling, happy eyes. Sitting with friends in a sunny room, surrounded by amazing unique creature drawings. Masterpiece storybook style illustration.`,
    allowDecoration: true
  }
];
