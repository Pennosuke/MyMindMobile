export const MockupData = [
  {
    contentId: '1',
    contentType: 'Info',
    contentText: 'This is info with image',
    hasImage: true,
    imageUri: require(`../assets/charecters/Character-01.png`)
  },
  {
    contentId: '4',
    contentType: 'EmotionButtons',
    contentText: 'This is emotion buttons',
    emotions: [
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
    ],
    minEmotions: 1,
    maxEmotions: 3
  },
  {
    contentId: '2',
    contentType: 'TextInput',
    contentText: 'This is text input',
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
        textBoxSize: 'large'
      },
      {
        questionText: 'ระดับอุณหภูมิร่างกาย',
        placeholderText: 'Insert Here4',
        textBoxSize: 'normal'
      }
    ]
  },
  {
    contentId: '3',
    contentType: 'Info',
    contentText: 'This is info without image',
    hasImage: false,
    imageUri: undefined
  }
]