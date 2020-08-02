export const emotions = [
  {
    name: 'angry',
    imageUri: require('../assets/emotions/angry.png')
  },
  {
    name: 'brave',
    imageUri: require('../assets/emotions/brave.png')
  },
  {
    name: 'calm',
    imageUri: require('../assets/emotions/calm.png')
  },
  {
    name: 'confident',
    imageUri: require('../assets/emotions/confident.png')
  },
  {
    name: 'confused',
    imageUri: require('../assets/emotions/confused.png')
  },
  {
    name: 'disapoint',
    imageUri: require('../assets/emotions/disapointed.png')
  },
  {
    name: 'embarrassed',
    imageUri: require('../assets/emotions/embarrassed.png')
  },
  {
    name: 'exicited',
    imageUri: require('../assets/emotions/excited.png')
  },
  {
    name: 'guilty',
    imageUri: require('../assets/emotions/guilty.png')
  },
  {
    name: 'happy',
    imageUri: require('../assets/emotions/happy.png')
  },
  {
    name: 'lonely',
    imageUri: require('../assets/emotions/lonely.png')
  },
  {
    name: 'proud',
    imageUri: require('../assets/emotions/proud.png')
  },
  {
    name: 'scared',
    imageUri: require('../assets/emotions/scared.png')
  },
  {
    name: 'shame',
    imageUri: require('../assets/emotions/shame.png')
  },
  {
    name: 'worried',
    imageUri: require('../assets/emotions/worried.png')
  }
]

export const MockupData = [
  {
    contentId: '1',
    contentType: 'Info',
    contentText: 'คำอธิบายก่อนการฝึก\n\n    สวัสดีค่ะน้องๆ หลังจากที่เราได้รู้แล้วว่าขณะนี้สภาวะทางจิตใจของเราเป็น อย่างไร ต่อไปเราจะมาเรียนรู้วิธีการต่าง ๆ ที่จะส่งเสริมให้น้องๆ สามารถทีจะมีสภาวะทางจิตใจที่ดีไม่ว่าจะมีเหตุการณ์อะไรเข้ามาในชีวิตก็ตาม อยากรู้แล้วใช่ไหมละ เรามาดูรายละเอียดกันก่อนนะ\n    1. น้องๆ จะต้องฝึกตามโปรแกรมไปตามลำดับนะคะ ตลอดโปรแกรมใช้เวลาประมาณ 2-3 สัปดาห์\n    2. น้องๆ จะได้รับแต้มสะสมคะแนนจากการฝึกตามขั้นตอนที่กำหนดให้และ\n    3. น้องๆ จะได้รับอุปกรณ์วัดความดันโลหิตและวัดการเต้นของหัวใจขอให้น้องๆ บันทึกผลลงในโปรแกรมตามที่กำหนดด้วยนะคะ'
  },
  {
    contentId: '2',
    contentType: 'Info',
    contentText: '    หลังจากรู้ขั้นตอนของโปรแกรมกันแล้ว เรามาเรียนรู้และฝึกฝนกันเลยนะคะ\n\n    ขอต้อนรับน้องๆ ทุกคนเข้าสู่โปรแกรมที่ 1 “หายใจคลายเครียด” อยากรู้แล้วใช่ไหมคะว่าลมหายใจของเรานั้น ช่วยให้เรามีสภาวะทางจิตใจที่ดีขึ้นได้อย่างไร ก่อนอื่น มาชมวิดีโอ “ประโยชน์ที่น่าทึ่งของการหายใจอย่างถูกวิธี” กันก่อนค่ะ อ้อ! อยากให้ตั้งใจดูด้วยนะคะ เพราะเราจะมีคำถามถามน้องๆ ด้วยค่ะ',
    options: {
      imageUri: require(`../assets/charecters/Character-02.png`)
    }
  },
  {
    contentId: '3',
    contentType: 'Video',
    contentText: '',
    videoUri: {uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}
    /*videoUri: require('../assets/videos/VDO_หมายเลข_1._ประโยชน์ที่น่าทึ่งของการหายใจ.mp4')*/
  },
  {
    contentId: '4',
    contentType: 'TextInput',
    contentText: 'ขอให้น้องวัดความดันโลหิต และการเต้นของหัวใจก่อนนะคะ',
    questions: [
      {
        questionText: 'ความดันโลหิตตัวบน',
        placeholderText: 'Insert Here1',
        textBoxSize: 'normal'
      },
      {
        questionText: 'ความดันโลหิตตัวล่าง',
        placeholderText: 'Insert Here2',
        textBoxSize: 'normal'
      },
      {
        questionText: 'จำนวนครั้งของการเต้นหัวใจ ใน 1 นาที',
        placeholderText: 'Insert Here3',
        textBoxSize: 'normal'
      },
      {
        questionText: 'ระดับอุณหภูมิร่างกาย',
        placeholderText: 'Insert Here4',
        textBoxSize: 'normal'
      }
    ]
  },
  {
    contentId: '5',
    contentType: 'EmotionButtons',
    contentText: 'น้อง ๆ รู้สึกอย่างไรกันบ้างคะ ช่วยเลือกรูปภาพที่ตรงกับความรู้สึกของน้องมากที่สุดนะคะ',
    minEmotions: 1,
    maxEmotions: 3
  },
  {
    contentId: '6',
    contentType: 'EmotionRating',
    contentText: 'ช่วยบอกระดับความรู้สึกที่น้องๆเลือกมาด้วยนะคะ',
    answerIdRef: '5'
  },
  {
    contentId: '7',
    contentType: 'SortingQuestion',
    contentText: 'ข้อที่4 ขอให้เรียงล้าดับขั้นตอนของการฝึกการตระหนักรู้ในอารมณ์',
    choices: [
      'สร้างนิสัยรับรู้อารมณ์และความรู้สึก',
      'เล่าให้คนใกล้ชิดฟัง',
      'ให้คะแนนอารมณ์ความรู้สึกที่เกิดขึ้น'
    ]
  },
  /*
  {
    contentId: '8',
    contentType: 'MultipleSelection',
    contentText: '',

  }
  */
]