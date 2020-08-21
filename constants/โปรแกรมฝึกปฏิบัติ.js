export const Program1 = [
  {
    contentId: '1',
    contentType: 'Info',
    contentText: '    หลังจากรู้ขั้นตอนของโปรแกรมกันแล้ว เรามาเรียนรู้และฝึกฝนกันเลยนะคะ\n\n    ขอต้อนรับน้องๆ ทุกคนเข้าสู่โปรแกรมที่ 1 “หายใจคลายเครียด” อยากรู้แล้วใช่ไหมคะว่าลมหายใจของเรานั้น ช่วยให้เรามีสภาวะทางจิตใจที่ดีขึ้นได้อย่างไร ก่อนอื่น มาชมวิดีโอ “ประโยชน์ที่น่าทึ่งของการหายใจอย่างถูกวิธี” กันก่อนค่ะ อ้อ! อยากให้ตั้งใจดูด้วยนะคะ เพราะเราจะมีคำถามถามน้องๆ ด้วยค่ะ',
    options: {
      imageUri: require(`../assets/charecters/Character-02.png`)
    }
  },
  {
    contentId: '2',
    contentType: 'Video',
    contentText: 'ประโยชน์ที่น่าทึ่งของการหายใจอย่างถูกวิธี',
    videoUri: {uri: 'https://firebasestorage.googleapis.com/v0/b/mymindmobile-d9d9b.appspot.com/o/videos%2FVDO_%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%A5%E0%B8%82_1._%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%82%E0%B8%A2%E0%B8%8A%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%97%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AB%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%88.mp4?alt=media&token=a0c0725e-8506-4773-8c40-db7839da76a1'},
    minTime: 3
  },
  {
    contentId: '3',
    contentType: 'EmotionButtons',
    contentText: 'ชมวิดีโอกันแล้ว น้อง ๆ รู้สึกอย่างไรกันบ้างคะ ช่วยเลือกรูปภาพที่ตรงกับความรู้สึกของน้องมากที่สุดนะคะ (เลือกได้ไม่เกิน 3 ภาพค่ะ)',
    minEmotions: 1,
    maxEmotions: 3
  },
  {
    contentId: '4',
    contentType: 'EmotionRating',
    contentText: 'ช่วยบอกระดับความรู้สึกที่น้องๆเลือกมาด้วยนะคะ',
    answerIdRef: '3'
  },
  {
    contentId: '5',
    contentType: 'TextInput',
    contentText: '',
    questions: [
      {
        questionText: 'มีความรู้สึกอย่างอื่นเพิ่มเติมกันอีกไหม๊คะ น้องๆ เขียนบอกพี่ได้เลยค่ะ',
        placeholderText: 'เขียนใส่ในช่องนี้ได้เลย',
        textBoxSize: 'large',
        needAnswer: false
      },
    ]
  },
  {
    contentId: '6',
    contentType: 'Info',
    contentText: 'ขอให้น้องๆ มาทบทวนความรู้โดยการตอบคำถามกันนะคะ เพื่อจะได้รู้ว่าน้องๆ เข้าใจเรื่องราวจาก VDO มากน้อยแค่ไหนค่ะ',
    options: {
      imageUri: require(`../assets/charecters/Character-02.png`)
    }
  },
  {
    contentId: '7',
    contentType: 'SelectionGroup',
    contentText: 'ข้อที่1 การหายใจอย่างถูกวิธีมีลักษณะอย่างไร (1 คะแนน)',
    choices: [
      {
        choiceText: 'ก. สูดลมหายใจเข้าสั้น ๆ พุงแฟบ ปล่อยลมหายใจออกสั้น ๆ พุงป่อง',
        value: 0
      },
      {
        choiceText: 'ข. สูดลมหายใจเข้าสั้น ๆ พุงแฟบ ปล่อยลมหายใจออกยาว ๆ พุงป่อง',
        value: 0
      },
      {
        choiceText: 'ค. สูดลมหายใจเข้าลึก ๆ พุงป่อง ปล่อยลมหายใจออกยาว ๆ พุงแฟบ',
        value: 1
      },
      {
        choiceText: 'ง. สูดลมหายใจเข้าลึก ๆ พุงป่อง ปล่อยลมหายใจออกสั้น ๆ พุงแฟบ',
        value: 0
      },
    ]
  },
  {
    contentId: '8',
    contentType: 'SelectionGroup',
    contentText: 'ข้อที่2 ข้อใด ไม่ใช่ ประโยชน์ของการหายใจอย่างถูกวิธี(1 คะแนน)',
    choices: [
      {
        choiceText: 'ก. ช่วยสลายความเครียด',
        value: 0
      },
      {
        choiceText: 'ข. กระตุ้นความดันโลหิตให้สูงขึ้น',
        value: 1
      },
      {
        choiceText: 'ค. ผ่อนคลายและจิตใจสงบ',
        value: 0
      },
      {
        choiceText: 'ง. ออกซิเจนไปเลี้ยงสมองมากขึ้น',
        value: 0
      },
    ]
  },
  {
    contentId: '9',
    contentType: 'SelectionGroup',
    contentText: 'ข้อที่3 ข้อใด ไม่ถูกต้อง เกี่ยวกับการหายใจคลายเครียด (1 คะแนน)',
    choices: [
      {
        choiceText: 'ก. ปล่อยสารคอร์ติซอลมากขึ้น ทำให้ร่างกายสงบ',
        value: 1
      },
      {
        choiceText: 'ข. ปล่อยสารเอ็นดอร์ฟิน ช่วยให้ร่างกายมีความสุข',
        value: 0
      },
      {
        choiceText: 'ค. ระบบประสาทที่เกี่ยวกับการผ่อนคลายของร่างกายทำงานดีขึ้น',
        value: 0
      },
      {
        choiceText: 'ง. อัตราการเต้นของหัวใจลดลง ผ่อนคลายมากขึ้น',
        value: 0
      },
    ]
  },
  {
    contentId: '10',
    contentType: 'SelectionGroup',
    contentText: 'ข้อที่4 ประโยชน์ของการหายใจอย่างถูกวิธีคือ (1 คะแนน)',
    choices: [
      {
        choiceText: 'ก. เพิ่มพลังงานในร่างกาย ท้าให้อุณหภูมิของร่างกายสูงขึ้น',
        value: 0
      },
      {
        choiceText: 'ข. เพิ่มอัตราการเต้นของหัวใจ ท้าให้เราตื่นเต้น และร่าเริงตลอดเวลา',
        value: 0
      },
      {
        choiceText: 'ค. ปริมาณคาร์บอนไดออกไซด์ไปยังอวัยวะที่ใช้ในการย่อยอาหารมากขึ้น',
        value: 0
      },
      {
        choiceText: 'ง. ภูมิคุ้มกันของร่างกายดีขึ้น',
        value: 1
      },
    ]
  },
  {
    contentId: '11',
    contentType: 'SelectionGroup',
    contentText: 'ข้อที่5 ข้อดีของการหายใจอย่างถูกวิธีต่อระบบไหลเวียนเลือด (1 คะแนน)',
    choices: [
      {
        choiceText: 'ก. เพิ่มออกซิเจนในเลือด',
        value: 1
      },
      {
        choiceText: 'ข. เพิ่มจ้านวนเม็ดเลือดแดงในเลือด',
        value: 0
      },
      {
        choiceText: 'ค. เพิ่มคาร์บอนไดออกไซด์ในเลือด',
        value: 0
      },
      {
        choiceText: 'ง. เพิ่มสารต้านอนุมูลอิสระในเลือด',
        value: 1
      },
    ]
  },
  {
    contentId: '12',
    contentType: 'QuestionValidate',
    contentTextPass: 'เก่งมากค่ะ ตอบถูกทุกข้อเลยค่ะ',
    contentTextFail: 'เสียดายจังยังมีข้อที่ตอบไม่ถูก มาเรียนรู้เพื่อที่จะได้ตอบถูกทุกข้อกันนะคะ พี่มีทางเลือกให้ค่ะ',
    minScore: 5,
    backToVideo: 10,
    backToFirstQuestion: 5,
    answerIdRef: [
      '7',
      '8',
      '9',
      '10',
      '11'
    ],
    options: {
      imageUriPass: require(`../assets/charecters/Character-03.png`),
      imageUriFail: require(`../assets/charecters/Character-02.png`)
    }
  },
  {
    contentId: '13',
    contentType: 'TextInput',
    contentText: '',
    questions: [
      {
        questionText: 'นอกเหนือจากคำถามของพี่ น้องคิดว่า น้องได้ประโยชน์อะไรอีกบ้างจากการหายใจอย่างถูกวิธีค่ะ',
        placeholderText: 'เขียนใส่ในช่องนี้ได้เลย',
        textBoxSize: 'large',
        needAnswer: false
      },
    ]
  },
  {
    contentId: '14',
    contentType: 'Info',
    contentText: 'เมื่อน้องๆ ได้ทราบประโยชน์ที่น่าทึ่งของการหายใจอย่างถูกวิธีกันแล้ว ต่อไปเรามาเรียนรู้กันต่อว่า การหายใจช่วยสลายความเครียดได้อย่างไร มาชมวิดีโอกันค่ะ',
    options: {
      imageUri: require(`../assets/charecters/Character-02.png`)
    }
  },
  {
    contentId: '15',
    contentType: 'Video',
    contentText: 'หายใจสลายเครียด',
    videoUri: {uri: 'https://firebasestorage.googleapis.com/v0/b/mymindmobile-d9d9b.appspot.com/o/videos%2FVDO_%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%A5%E0%B8%82_2._%E0%B8%AB%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%88%E0%B8%AA%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%94.mp4?alt=media&token=71dac491-5c9d-4f1e-8cc6-8a17e5e0f374'},
    minTime: 3
  },
  {
    contentId: '16',
    contentType: 'TextInput',
    contentText: 'เมื่อน้องรู้แล้วว่าการหายใจมีประโยชน์กับน้องอย่างไร คงอยากฝึกกันแล้วใช่ไหมคะ แต่ก่อนที่จะฝึกกัน ขอให้น้องวัดความดันโลหิต การเต้นของหัวใจก่อนนะคะ',
    questions: [
      {
        questionText: 'ความดันโลหิตตัวบน',
        placeholderText: 'Insert Here1',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ความดันโลหิตตัวล่าง',
        placeholderText: 'Insert Here2',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'จำนวนครั้งของการเต้นหัวใจ ใน 1 นาที',
        placeholderText: 'Insert Here3',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ระดับอุณหภูมิร่างกาย',
        placeholderText: 'Insert Here4',
        textBoxSize: 'small',
        needAnswer: true
      }
    ]
  },
  {
    contentId: '17',
    contentType: 'EmotionButtons',
    contentText: 'ชมวิดีโอกันแล้ว น้อง ๆ รู้สึกอย่างไรกันบ้างคะ ช่วยเลือกรูปภาพที่ตรงกับความรู้สึกของน้องมากที่สุดนะคะ (เลือกได้ไม่เกิน 3 ภาพค่ะ)',
    minEmotions: 1,
    maxEmotions: 3
  },
  {
    contentId: '18',
    contentType: 'EmotionRating',
    contentText: 'ช่วยบอกระดับความรู้สึกที่น้องๆเลือกมาด้วยนะคะ',
    answerIdRef: '17'
  },
  {
    contentId: '19',
    contentType: 'Video',
    contentText: 'เอาล่ะค่ะ พร้อมฝึกกันแล้วนะคะ\nต่อไปนี้ ขอให้น้องชมวิดีโอ “การหายใจอย่างถูกวิธี” และฝึกไปพร้อมๆ กันค่ะ',
    videoUri: {uri: 'https://firebasestorage.googleapis.com/v0/b/mymindmobile-d9d9b.appspot.com/o/videos%2FVDO_%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%A5%E0%B8%82_3._%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AB%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%88%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%96%E0%B8%B9%E0%B8%81%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5.mp4?alt=media&token=68db6c42-cd97-4c88-9341-522d59101bda'},
    minTime: 3
  },
  {
    contentId: '20',
    contentType: 'Info',
    contentText: 'เมื่อน้องๆ ได้ฝึกกันแล้ว ขอให้น้องวัดความดันโลหิต การเต้นของหัวใจและเลือกภาพที่ตรงกับความรู้สึกของน้องมากที่สุด เลือกได้ไม่เกิน 3 ภาพค่ะ เรามาดูกันนะคะว่าสิ่งเหล่านี้จะเป็นอย่างไร แตกต่างจากเดิมกันหรือเปล่าค่ะ',
    options: {
      imageUri: require(`../assets/charecters/Character-02.png`)
    }
  },
  {
    contentId: '21',
    contentType: 'TextInput',
    contentText: 'ขอให้น้องวัดความดันโลหิต การเต้นของหัวใจก่อนนะคะ',
    questions: [
      {
        questionText: 'ความดันโลหิตตัวบน',
        placeholderText: 'Insert Here1',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ความดันโลหิตตัวล่าง',
        placeholderText: 'Insert Here2',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'จำนวนครั้งของการเต้นหัวใจ ใน 1 นาที',
        placeholderText: 'Insert Here3',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ระดับอุณหภูมิร่างกาย',
        placeholderText: 'Insert Here4',
        textBoxSize: 'small',
        needAnswer: true
      }
    ]
  },
  {
    contentId: '22',
    contentType: 'EmotionButtons',
    contentText: 'ช่วยเลือกรูปภาพที่ตรงกับความรู้สึกของน้องมากที่สุดนะคะ (เลือกได้ไม่เกิน 3 ภาพค่ะ)',
    minEmotions: 1,
    maxEmotions: 3
  },
  {
    contentId: '23',
    contentType: 'EmotionRating',
    contentText: 'ช่วยบอกระดับความรู้สึกที่น้องๆเลือกมาด้วยนะคะ',
    answerIdRef: '22'
  },
  {
    contentId: '24',
    contentType: 'TextInput',
    contentText: '',
    questions: [
      {
        questionText: 'น้องๆ ช่วยบอกความคิด/ความรู้สึกที่เกิดขึ้น หลังจากฝึกการหายใจอย่างถูกวิธีด้วยนะคะ',
        placeholderText: 'เขียนใส่ในช่องนี้ได้เลย',
        textBoxSize: 'large',
        needAnswer: false
      },
    ]
  },
  {
    contentId: '25',
    contentType: 'Info',
    contentText: 'หลังจากนี้ พี่จะให้เวลาน้องๆ 3 วัน ในการเรียนรู้และฝึกฝนตามวิดีโอนะคะ ขอให้น้องๆ ฝึกตาม VDO “การหายใจอย่างถูกวิธี” ทุกวันนะคะ วันละประมาณ 10-15 นาทีนะคะ จะท าให้น้องๆ ได้รับประโยชน์จากการหายใจอย่างถูกวิธีที่ส าคัญ อย่าลืมบันทึกความดันโลหิต การเต้นของหัวใจ และ เลือกภาพความรู้สึกที่ตรงกับความรู้สึกของน้องๆ มากที่สุด ก่อนและหลังการฝึกด้วยนะคะ',
    options: {
      imageUri: require(`../assets/charecters/Character-02.png`)
    }
  },
]

export const Homework1 = [
  {
    contentId: '1',
    contentType: 'TextInput',
    contentText: 'ขอให้น้องๆ วัดความดันโลหิต การเต้นของหัวใจ และบันทึกข้อมูลความดันโลหิตและการเต้นของหัวใจก่อนนะคะ',
    questions: [
      {
        questionText: 'ความดันโลหิตตัวบน',
        placeholderText: 'Insert Here1',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ความดันโลหิตตัวล่าง',
        placeholderText: 'Insert Here2',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'จำนวนครั้งของการเต้นหัวใจ ใน 1 นาที',
        placeholderText: 'Insert Here3',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ระดับอุณหภูมิร่างกาย',
        placeholderText: 'Insert Here4',
        textBoxSize: 'small',
        needAnswer: true
      }
    ]
  },
  {
    contentId: '2',
    contentType: 'EmotionButtons',
    contentText: 'ช่วยเลือกรูปภาพที่ตรงกับความรู้สึกของน้องมากที่สุดนะคะ (เลือกได้ไม่เกิน 3 ภาพค่ะ)',
    minEmotions: 1,
    maxEmotions: 3
  },
  {
    contentId: '3',
    contentType: 'EmotionRating',
    contentText: 'ช่วยบอกระดับความรู้สึกที่น้องๆเลือกมาด้วยนะคะ',
    answerIdRef: '2'
  },
  {
    contentId: '4',
    contentType: 'Video',
    contentText: 'เอาล่ะค่ะ พร้อมฝึกกันแล้วนะคะ\nต่อไปนี้ ขอให้น้องชมวิดีโอ “การหายใจอย่างถูกวิธี” และฝึกไปพร้อมๆ กันค่ะ',
    videoUri: {uri: 'https://firebasestorage.googleapis.com/v0/b/mymindmobile-d9d9b.appspot.com/o/videos%2FVDO_%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%A5%E0%B8%82_3._%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AB%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%88%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%96%E0%B8%B9%E0%B8%81%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5.mp4?alt=media&token=68db6c42-cd97-4c88-9341-522d59101bda'},
    minTime: 3
  },
  {
    contentId: '5',
    contentType: 'Info',
    contentText: 'เมื่อน้องๆ ได้ฝึกฝนกันแล้ว น้องๆช่วยวัดความดันโลหิต การเต้นของหัวใจ และเลือกภาพที่ตรงกับความรู้สึกของน้องมากที่สุด 3 ภาพ เหมือนเช่นเคยนะคะ มาดูซิว่าสิ่งต่างๆเหล่านี้เปลี่ยนแปลงไปจากเดิมหรือเปล่า',
    options: {
      imageUri: require(`../assets/charecters/Character-04.png`)
    }
  },
  {
    contentId: '6',
    contentType: 'TextInput',
    contentText: 'ขอให้น้องวัดความดันโลหิต การเต้นของหัวใจนะคะ',
    questions: [
      {
        questionText: 'ความดันโลหิตตัวบน',
        placeholderText: 'Insert Here1',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ความดันโลหิตตัวล่าง',
        placeholderText: 'Insert Here2',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'จำนวนครั้งของการเต้นหัวใจ ใน 1 นาที',
        placeholderText: 'Insert Here3',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ระดับอุณหภูมิร่างกาย',
        placeholderText: 'Insert Here4',
        textBoxSize: 'small',
        needAnswer: true
      }
    ]
  },
  {
    contentId: '7',
    contentType: 'EmotionButtons',
    contentText: 'ช่วยเลือกรูปภาพที่ตรงกับความรู้สึกของน้องมากที่สุดนะคะ (เลือกได้ไม่เกิน 3 ภาพค่ะ)',
    minEmotions: 1,
    maxEmotions: 3
  },
  {
    contentId: '8',
    contentType: 'EmotionRating',
    contentText: 'ช่วยบอกระดับความรู้สึกที่น้องๆเลือกมาด้วยนะคะ',
    answerIdRef: '7'
  },
]

export const Program2 = [
  {
    contentId: '1',
    contentType: 'Info',
    contentText: 'สวัสดีค่ะ น้องๆ ได้ฝึกการหายใจอย่างถูกวิธีกันมา 3 วันแล้วนะคะ ได้เรียนรู้ว่าการหายใจอย่างถูกวิธีท าให้เกิดการเปลี่ยนแปลงทางร่างกาย และ ความรู้สึกของเราเองก็เปลี่ยนแปลงไปเช่นกัน ต่อไปเรามาเรียนรู้เกี่ยวกับการรับรู้ความรู้สึกของร่างกายของเรากัน หากเราสามารถรับรู้ได้จะเกิดผลดีกับเราอย่างไร มาเรียนรู้กันนะคะน้องๆ',
    options: {
      imageUri: require(`../assets/charecters/Character-04.png`)
    }
  },
  {
    contentId: '2',
    contentType: 'TextInput',
    contentText: 'แต่ก่อนอื่นขอให้น้องๆ วัดความดันโลหิต การเต้นของหัวใจ และบันทึกข้อมูลความดันโลหิตและการเต้นของหัวใจก่อนนะคะ',
    questions: [
      {
        questionText: 'ความดันโลหิตตัวบน',
        placeholderText: 'Insert Here1',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ความดันโลหิตตัวล่าง',
        placeholderText: 'Insert Here2',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'จำนวนครั้งของการเต้นหัวใจ ใน 1 นาที',
        placeholderText: 'Insert Here3',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ระดับอุณหภูมิร่างกาย',
        placeholderText: 'Insert Here4',
        textBoxSize: 'small',
        needAnswer: true
      }
    ]
  },
  {
    contentId: '3',
    contentType: 'EmotionButtons',
    contentText: 'ช่วยเลือกรูปภาพที่ตรงกับความรู้สึกของน้องมากที่สุดนะคะ (เลือกได้ไม่เกิน 3 ภาพค่ะ)',
    minEmotions: 1,
    maxEmotions: 3
  },
  {
    contentId: '4',
    contentType: 'EmotionRating',
    contentText: 'ช่วยบอกระดับความรู้สึกที่น้องๆเลือกมาด้วยนะคะ',
    answerIdRef: '3'
  },
  {
    contentId: '5',
    contentType: 'Video',
    contentText: 'เอาล่ะค่ะ พร้อมฝึกกันแล้วนะคะ\n ต่อไปนี้ ขอให้น้องๆ ชมวิดีโอและฝึกไปพร้อมๆ กันกับ VDO นี้นะคะ',
    videoUri: {uri: 'https://firebasestorage.googleapis.com/v0/b/mymindmobile-d9d9b.appspot.com/o/videos%2FVDO_%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%A5%E0%B8%82_4.mp4?alt=media&token=80e376df-fd97-417a-87ca-b091d9415e91'},
    minTime: 3
  },
  {
    contentId: '6',
    contentType: 'Info',
    contentText: 'เมื่อน้องๆ ได้ฝึกฝนกันแล้ว น้องๆช่วยวัดความดันโลหิต การเต้นของหัวใจ และเลือกภาพที่ตรงกับความรู้สึกของน้องมากที่สุด 3 ภาพ เหมือนเช่นเคยนะคะ มาดูซิว่าสิ่งต่างๆเหล่านี้เปลี่ยนแปลงไปจากเดิมหรือเปล่า',
    options: {
      imageUri: require(`../assets/charecters/Character-04.png`)
    }
  },
  {
    contentId: '7',
    contentType: 'TextInput',
    contentText: 'ขอให้น้องวัดความดันโลหิต การเต้นของหัวใจก่อนนะคะ',
    questions: [
      {
        questionText: 'ความดันโลหิตตัวบน',
        placeholderText: 'Insert Here1',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ความดันโลหิตตัวล่าง',
        placeholderText: 'Insert Here2',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'จำนวนครั้งของการเต้นหัวใจ ใน 1 นาที',
        placeholderText: 'Insert Here3',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ระดับอุณหภูมิร่างกาย',
        placeholderText: 'Insert Here4',
        textBoxSize: 'small',
        needAnswer: true
      }
    ]
  },
  {
    contentId: '8',
    contentType: 'EmotionButtons',
    contentText: 'ช่วยเลือกรูปภาพที่ตรงกับความรู้สึกของน้องมากที่สุดนะคะ (เลือกได้ไม่เกิน 3 ภาพค่ะ)',
    minEmotions: 1,
    maxEmotions: 3
  },
  {
    contentId: '9',
    contentType: 'EmotionRating',
    contentText: 'ช่วยบอกระดับความรู้สึกที่น้องๆเลือกมาด้วยนะคะ',
    answerIdRef: '8'
  },
  {
    contentId: '10',
    contentType: 'TextInput',
    contentText: '',
    questions: [
      {
        questionText: 'มีความรู้สึกอย่างอื่นเพิ่มเติมที่น้องๆ อยากจะบอก เขียนเพิ่มเติมได้เลยนะคะ',
        placeholderText: 'เขียนใส่ในช่องนี้ได้เลย',
        textBoxSize: 'large',
        needAnswer: false
      },
    ]
  },
  {
    contentId: '11',
    contentType: 'Info',
    contentText: 'พี่จะให้เวลาน้อง 3 วัน ในการฝึกรับรู้ความรู้สึกของร่างกายตามวิดีโอนะคะ ขอให้น้องตั้งใจฝึกตาม VDO ทุกวัน น้องจะได้รับประโยชน์จากการฝึกอย่างสม่ าเสมอ ที่ส าคัญอย่าลืมบันทึกความดันโลหิต การเต้นของหัวใจ และ เลือกภาพความรู้สึกที่ตรงกับความรู้สึกของน้องมากที่สุด ทั้งก่อนและหลังการฝึกด้วยนะคะ',
    options: {
      imageUri: require(`../assets/charecters/Character-04.png`)
    }
  },
]

export const Homework2 = [
  {
    contentId: '1',
    contentType: 'TextInput',
    contentText: 'ขอให้น้องๆ วัดความดันโลหิต การเต้นของหัวใจ และบันทึกข้อมูลความดันโลหิตและการเต้นของหัวใจก่อนนะคะ',
    questions: [
      {
        questionText: 'ความดันโลหิตตัวบน',
        placeholderText: 'Insert Here1',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ความดันโลหิตตัวล่าง',
        placeholderText: 'Insert Here2',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'จำนวนครั้งของการเต้นหัวใจ ใน 1 นาที',
        placeholderText: 'Insert Here3',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ระดับอุณหภูมิร่างกาย',
        placeholderText: 'Insert Here4',
        textBoxSize: 'small',
        needAnswer: true
      }
    ]
  },
  {
    contentId: '2',
    contentType: 'EmotionButtons',
    contentText: 'ช่วยเลือกรูปภาพที่ตรงกับความรู้สึกของน้องมากที่สุดนะคะ (เลือกได้ไม่เกิน 3 ภาพค่ะ)',
    minEmotions: 1,
    maxEmotions: 3
  },
  {
    contentId: '3',
    contentType: 'EmotionRating',
    contentText: 'ช่วยบอกระดับความรู้สึกที่น้องๆเลือกมาด้วยนะคะ',
    answerIdRef: '2'
  },
  {
    contentId: '4',
    contentType: 'Video',
    contentText: 'เอาล่ะค่ะ พร้อมฝึกกันแล้วนะคะ\n ต่อไปนี้ ขอให้น้องๆ ชมวิดีโอและฝึกไปพร้อมๆ กันกับ VDO นี้นะคะ',
    videoUri: {uri: 'https://firebasestorage.googleapis.com/v0/b/mymindmobile-d9d9b.appspot.com/o/videos%2FVDO_%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%A5%E0%B8%82_4.mp4?alt=media&token=80e376df-fd97-417a-87ca-b091d9415e91'},
    minTime: 3
  },
  {
    contentId: '5',
    contentType: 'Info',
    contentText: 'เมื่อน้องๆ ได้ฝึกฝนกันแล้ว น้องๆช่วยวัดความดันโลหิต การเต้นของหัวใจ และเลือกภาพที่ตรงกับความรู้สึกของน้องมากที่สุด 3 ภาพ เหมือนเช่นเคยนะคะ มาดูซิว่าสิ่งต่างๆเหล่านี้เปลี่ยนแปลงไปจากเดิมหรือเปล่า',
    options: {
      imageUri: require(`../assets/charecters/Character-04.png`)
    }
  },
  {
    contentId: '6',
    contentType: 'TextInput',
    contentText: 'ขอให้น้องวัดความดันโลหิต การเต้นของหัวใจนะคะ',
    questions: [
      {
        questionText: 'ความดันโลหิตตัวบน',
        placeholderText: 'Insert Here1',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ความดันโลหิตตัวล่าง',
        placeholderText: 'Insert Here2',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'จำนวนครั้งของการเต้นหัวใจ ใน 1 นาที',
        placeholderText: 'Insert Here3',
        textBoxSize: 'small',
        needAnswer: true
      },
      {
        questionText: 'ระดับอุณหภูมิร่างกาย',
        placeholderText: 'Insert Here4',
        textBoxSize: 'small',
        needAnswer: true
      }
    ]
  },
  {
    contentId: '7',
    contentType: 'EmotionButtons',
    contentText: 'ช่วยเลือกรูปภาพที่ตรงกับความรู้สึกของน้องมากที่สุดนะคะ (เลือกได้ไม่เกิน 3 ภาพค่ะ)',
    minEmotions: 1,
    maxEmotions: 3
  },
  {
    contentId: '8',
    contentType: 'EmotionRating',
    contentText: 'ช่วยบอกระดับความรู้สึกที่น้องๆเลือกมาด้วยนะคะ',
    answerIdRef: '7'
  },
]