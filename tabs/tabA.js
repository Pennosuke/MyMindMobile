import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function tabA() {

  const navigation = useNavigation();

  const survey = [
    {
      questionType: 'Info',
      questionText: 'แบบวัดสุขภาวะทางจิตใจ\n\nข้อความต่อไปนี้เป็นข้อความเกี่ยวกับความรู้สึกและความคิดของคุณ\nกรุณาเลือกตัวเลือกที่ตรงกับที่คุณคิดหรือรู้สึกของคุณมากที่สุด'
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '1. บุคคลอื่นมีอิทธิพลต่อความคิดของฉันเป็นอย่างมาก',
      questionId: 'SPWB_1_autonomy',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 6
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 1
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '2.โดยทั่วไปแล้ว ฉันคิดว่าฉันสามารถจัดการกับสถานการณ์ที่ฉันประสบอยู่ได้',
      questionId: 'SPWB_2_environmentalMastery',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 1
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 6
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '3. ฉันคิดว่าประสบการณ์ใหม่ๆเป็นสิ่งสำคัญที่ท้าทายในการมองตนเองและการมองโลก',
      questionId: 'SPWB_3_personalGrowth',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 1
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 6
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '4. การรักษาสัมพันธภาพกับผู้อื่นให้แนบแน่นเป็นความยากลำบากและอึดอัดสำหรับฉัน',
      questionId: 'SPWB_4_positiveRelationsWithOthers',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 6
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 1
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '5.ฉันใช้ชีวิตไปวันๆและไม่คิดอะไรเกี่ยวกับอนาคตเลย',
      questionId: 'SPWB_5_purposeInLife',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 6
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 1
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '6.เมื่อฉันมองดูเรื่องราวในชีวิตของฉัน ฉันพอใจกับสิ่งที่เกิดขึ้นมา',
      questionId: 'SPWB_6_selfAcceptance',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 1
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 6
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '7.ฉันเชื่อมั่นในความคิดเห็นของฉัน ถึงแม้ว่ามันจะขัดแย้งกับความคิดเห็นของคนในสังคม',
      questionId: 'SPWB_7_autonomy',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 1
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 6
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '8.บ่อยครั้งการทำบทบาทหน้าที่ในชีวิตทำให้ฉันรู้สึกแย่',
      questionId: 'SPWB_8_environmentalMastery',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 6
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 1
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '9.สำหรับฉัน ชีวิตคือกระบวนการเรียนรู้การเปลี่ยนแปลง และการเติบโตอย่างต่อเนื่อง',
      questionId: 'SPWB_9_personalGrowth',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 1
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 6
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '10.บุคคลอื่นมองว่าฉันเป็นผู้ให้และเต็มใจที่จะใช้เวลากับผู้อื่น',
      questionId: 'SPWB_10_positiveRelationsWithOthers',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 1
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 6
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '11.คนบางคนมักจะขาดเป้าหมายในชีวิตแต่ฉันไม่ใช่คนเหล่านั้น',
      questionId: 'SPWB_11_purposeInLife',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 1
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 6
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '12.ฉันชอบลักษณะบุคลิกภาพโดยส่วนใหญ่ของฉัน',
      questionId: 'SPWB_12_selfAcceptance',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 1
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 6
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '13.ฉันตัดสินตัวเองจากสิ่งที่ฉันคิดว่ามันเป็นสิ่งสำคัญ ไม่ใช่ตัดสินตามค่านิยมของคนอื่น',
      questionId: 'SPWB_13_autonomy',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 1
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 6
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '14.ฉันสามารถจัดการกับหน้าที่รับผิดชอบหลายๆอย่างในชีวิตประจำวันของฉันได้เป็นอย่างดี',
      questionId: 'SPWB_14_environmentalMastery',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 1
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 6
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '15.ฉันละทิ้งความพยายามที่จะปรับปรุงหรือเปลี่ยนแปลงตัวเองมานานแล้ว',
      questionId: 'SPWB_15_personalGrowth',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 6
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 1
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '16.ฉันไม่เคยสัมผัสกับสัมพันธภาพที่อบอุ่นและน่าไว้วางใจกับบุคคลอื่น',
      questionId: 'SPWB_16_positiveRelationsWithOthers',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 6
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 1
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '17.บางครั้งฉันรู้สึกว่าฉันได้ทำทุกอย่างที่ควรทำแล้วในชีวิต',
      questionId: 'SPWB_17_purposeInLife',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 1
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 6
        }
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '18.ฉันรู้สึกผิดหวังกับความสำเร็จในชีวิตจากหลายๆเหตุการณ์ของฉัน',
      questionId: 'SPWB_18_selfAcceptance',
      options: [
        {
          optionText: 'ไม่เห็นด้วยอย่างยิ่ง',
          value: 6
        },
        {
          optionText: 'ไม่เห็นด้วยมาก',
          value: 5
        },
        {
          optionText: 'ไม่เห็นด้วยบางครั้ง',
          value: 4
        },
        {
          optionText: 'เห็นด้วยบางครั้ง',
          value: 3
        },
        {
          optionText: 'เห็นด้วยมาก',
          value: 2
        },
        {
          optionText: 'เห็นด้วยอย่างยิ่ง',
          value: 1
        }
      ]
    },
    {
      questionType: 'Info',
      questionText: 'โปรดอ่านข้อความในแต่ละข้อและเลือกตัวเลือกให้ตรงกับท่านมากที่สุด ในช่วงสัปดาห์ที่ผ่านมา\nทั้งนี้ไม่มีคำตอบที่ถูกหรือผิด ท่านไม่ควรใช้เวลามากนักในแต่ละข้อความ'
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '1.ฉันรู้สึกยากที่จะสงบจิตใจลง',
      questionId: 'DASS_1_stress',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '2.ฉันรู้สึกปากแห้งคอแห้ง',
      questionId: 'DASS_2_anxiety',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '3.ฉันแทบไม่รู้สึกอะไรดีๆ เลย',
      questionId: 'DASS_3_depression',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '4.ฉันมีอาการหายใจผิดปกติ (เช่น หายใจเร็วเกินเหตุ หายใจไม่ทันแม้ว่าจะไม่ได้ออกแรง)',
      questionId: 'DASS_4_anxiety',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '5.ฉันพบว่ามันยากที่จะคิดริเริ่มทำสิ่งใดสิ่งหนึ่ง',
      questionId: 'DASS_5_depression',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '6.ฉันมีแนวโน้มที่จะตอบสนองเกินเหตุต่อสถานการณ์',
      questionId: 'DASS_6_stress',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '7.ฉันรู้สึกว่าร่างกายบางส่วนสั่นผิดปกติ (เช่น มือสั่น)',
      questionId: 'DASS_7_anxiety',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '8.ฉันรู้สึกเสียพลังงานไปมากกับการวิตกกังวล',
      questionId: 'DASS_8_stress',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '9.ฉันรู้สึกกังวลกับเหตุการณ์ที่อาจทำให้ฉันรู้สึกตื่นกลัวและกระทำบางสิ่งที่น่าอับอาย',
      questionId: 'DASS_9_anxiety',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '10.ฉันรู้สึกไม่มีเป้าหมายในชีวิต',
      questionId: 'DASS_10_depression',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '11.ฉันรู้สึกกระวนกระวายใจ',
      questionId: 'DASS_11_stress',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '12.ฉันรู้สึกยากที่จะผ่อนคลายตัวเอง',
      questionId: 'DASS_12_stress',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '13.ฉันรู้สึกจิตใจเหงาหงอยเศร้าซึม',
      questionId: 'DASS_13_depression',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '14.ฉันรู้สึกทนไม่ได้เวลามีอะไรมาขัดขวางสิ่งที่ฉันกำลังทำอยู่',
      questionId: 'DASS_14_stress',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '15.ฉันรู้สึกกังวลกับเหตุการณ์ที่อาจทำให้ฉันรู้สึกตื่นกลัวและกระทำบางสิ่งที่น่าอับอาย',
      questionId: 'DASS_15_anxiety',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '16.ฉันรู้สึกไม่มีความกระตือรือร้นต่อสิ่งใด',
      questionId: 'DASS_16_depression',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '17.ฉันรู้สึกเป็นคนไม่มีคุณค่า',
      questionId: 'DASS_17_depression',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '18.ฉันรู้สึกค่อนข้างฉุนเฉียวง่าย',
      questionId: 'DASS_18_stress',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '19.ฉันรับรู้ถึงการทำงานของหัวใจแม้ในตอนที่ฉันไม่ได้ออกแรง (เช่น รู้สึกว่าหัวใจเต้นเร็วขึ้นหรือเต้นไม่เป็นจังหวะ)',
      questionId: 'DASS_19_anxiety',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '20.ฉันรู้สึกกลัวโดยไม่มีเหตุผล',
      questionId: 'DASS_20_anxiety',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'SelectionGroup',
      questionText:
        '21.ฉันรู้สึกว่าชีวิตไม่มีความหมาย',
      questionId: 'DASS_21_depression',
      options: [
        {
          optionText: 'ไม่ตรงกับฉันเลย',
          value: 0
        },
        {
          optionText: 'ตรงกับฉันบ้าง หรือเกิดขึ้นเป็นบางครั้ง',
          value: 1
        },
        {
          optionText: 'ตรงกับฉัน หรือเกิดขึ้นบ่อย',
          value: 2
        },
        {
          optionText: 'ตรงกับฉันมาก หรือเกิดขึ้นบ่อยมากที่สุด',
          value: 3
        },
      ]
    },
    {
      questionType: 'Info',
      questionText: 'ตอนนี้นักเรียนได้ทำแบบทดสอบครบทุกข้อแล้ว\nนักเรียนสามารถกดปุ่มเสร็จสิ้นเพื่อดูผลลัพธ์ได้เลย'
    },
  ]

  return (
    <View style={
      {flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 20}}>
      <Text style={styles.title}>ผลการประเมิน</Text>
      <Text style={{textAlign: 'center', padding: 20}}>คุณยังไม่เคยมีประวัติการทำแบบประเมิน</Text>
      <TouchableHighlight onPress={() => navigation.navigate('Survey', { data : survey })}>
        <View style={styles.roundedButton}>
          <Text style={{textAlign: 'center', padding: 20, color: 'white'}}>เริ่มทำแบบประเมิน</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    paddingLeft: 10,
    paddingRight: 10
  },
  topLeftButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 10
  },
  topRightButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10
  },
  roundedButton: {
    justifyContent:"center",
    alignItems:"center",
    width: 292,
    height: 62,
    borderRadius:30,
    backgroundColor:"#22459E",
    display: "flex",
    padding: 10,
    margin: 10
  },
  hiddenButton: {
    justifyContent:"center",
    alignItems:"center",
    width: 292,
    height: 62,
    borderRadius:30,
    backgroundColor:"white",
    display: "flex",
    padding: 10,
    margin: 10
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'black'
  }
});