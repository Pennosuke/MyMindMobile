//const abc = require(`../assets/charecters/Character-01.png`)

export const demoTreatment = [
  {
    questionType: 'Info',
    questionText: 'This is info with image',
    hasImage: true,
    imageUri: require(`../assets/charecters/Character-01.png`)
  },
  {
    questionType: 'TextInput',
    questionText: 'This is text input',
    questionId: 'textInputDemo',
    placeholderText: 'Insert Here!',
  },
  {
    questionType: 'Info',
    questionText: 'This is info without image',
    hasImage: false,
    imageUri: undefined
  },
  {
    questionType: 'TextInput',
    questionText: 'One More !',
    questionId: 'textInputDemo',
    placeholderText: 'Insert Here!',
  },
  /*{
    questionType: 'TextInputGroup',
    questionText: 'วัดและบันทึกความดันโลหิตและการเต้นของหัวใจ',
    questionId: 'Pretest',
    subQuestions: [
      {
        subQuestionText: 'ความดันโลหิตตัวบน',
        subQuestionId: 'textInputDemo1',
        placeholderText: 'Insert Here!',
      },
      {
        subQuestionText: 'ความดันโลหิตตัวล่าง',
        subQuestionId: 'textInputDemo2',
        placeholderText: 'Insert Here!',
      },
      {
        subQuestionText: 'จำนวนครั้งของการเต้นหัวใจ ใน 1 นาที',
        subQuestionId: 'textInputDemo3',
        placeholderText: 'Insert Here!',
      },
      {
        subQuestionText: 'ระดับอุณหภูมิร่างกาย',
        subQuestionId: 'textInputDemo4',
        placeholderText: 'Insert Here!',
      }
    ]
  },*/
  {
    questionType: 'NumericInput',
    questionText: 'It also supports numeric input. Enter your favorite number here!',
    questionId: 'favoriteNumber',
    placeholderText: '',
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Simple Survey also has multiple choice questions. What is your favorite pet?',
    questionId: 'favoritePet',
    options: [
      {
        optionText: 'Dogs',
        value: 'dog'
      },
      {
        optionText: 'Cats',
        value: 'cat'
      },
      {
        optionText: 'Ferrets',
        value: 'ferret'
      },
    ]
  },
  {
    questionType: 'MultipleSelectionGroup',
    questionText:
      'Select two or three of your favorite foods!',
    questionId: 'favoriteFoods',
    questionSettings: {
      maxMultiSelect: 3,
      minMultiSelect: 2,
    },
    options: [
      {
        optionText: 'Sticky rice dumplings',
        value: 'sticky rice dumplings'
      },
      {
        optionText: 'Pad Thai',
        value: 'pad thai'
      },
      {
        optionText: 'Steak and Eggs',
        value: 'steak and eggs'
      },
      {
        optionText: 'Tofu',
        value: 'tofu'
      },
      {
        optionText: 'Ice cream!',
        value: 'ice crem'
      },
      {
        optionText: 'Injera',
        value: 'injera'
      },
      {
        optionText: 'Tamales',
        value: 'tamales'
      }
    ]
  },
]