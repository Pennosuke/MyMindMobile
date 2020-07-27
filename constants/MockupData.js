export const MockupData = [
  {
    contentID: '1',
    contentType: 'Info',
    contentText: 'This is info with image',
    hasImage: true,
    imageUri: require(`../assets/charecters/Character-01.png`)
  },
  {
    contentID: '2',
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
    contentID: '3',
    contentType: 'Info',
    contentText: 'This is info without image',
    hasImage: false,
    imageUri: undefined
  }
]