import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';

import MenuButton from './MenuButton';
import LogoApp from './LogoApp';

export default function RealTime(props) {


    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#358FE2', '#2C0A8C']}
                start={[0.1, 0.1]}
                style={{
                    flex: 1,
                    left: 0,
                    right: 0,
                    top: 0,
                }}
            >
                <View style={styles.container}>
                    <MenuButton />
                    <LogoApp styles={[styles.logo, styles.image]} />
                    <Text style={styles.headerText}>הוראות עזרה בזמן אמת</Text>

                    <ScrollView style={{ height: 350, width: 300 }}>

                        <Text style={styles.phelp}>
                            דאג לבטיחותך ושמור על קור רוח •
                            החנה את הרכב לצד הדרך באופן שלא יפריע להגעת שרותי ההצלה ולזרימת התנועה •הדלק פנסי מצוקה, הצב משולש אזהרה ולבש אפוד זיהוי זוהר •
                            צור קשר עם הסובבים אותך ובדוק האם יש נפגעים •
                            חייג מייד 101 והזעק את צוותי מד"א •
                            התקשר לכוחות הצלה נוספים (משטרה, מכבי אש) •
                            הגש עזרה ראשונה עפ"י הכשרתך בפנייתך לקבלת עזרה ממוקד 101 של מגן דוד אדום יש למסור את הפרטים הבאים: •
                            מספר הטלפון ממנו אתה מתקשר •
                            כתובת מדויקת של מקום האירוע •
                            מספר הנפגעים •
                            האם ישנם סיכונים סביבתיים כגון שריפה/ לכודים/ פיצוץ ? •
                            דווח על סיכונים נוספים כמו חוטי חשמל קרועים, חומרים מסוכנים וכדומה •
                            ענה בסבלנות לשאלות המוקדן, לכל שאלה יש סיבה! אין לחלץ נפגעים מהרכב פרט למקרים הבאים: •
                            אם צפויה לנפגע סכנה בעקבות דליקה •
                            אם קיימת מעורבות של חומרים מסוכנים •
                            אם קיים לחץ של הרכב על גוף הנפגע •
                            אם קיימת סכנה מוחשית לחייו של הנפגע ולא ניתן לטפל בו ברכב טפל בנפגעים עפ"י הכשרתך, •
                            השתמש בערכה לעזרה ראשונה- אם קיימת ברכב •
                            במקרה של דליקה השתמש במטף לכיבוי דליקה מבלי לסכן את הנפגעים •
                            עצור דימומים פורצים באמצעות חבישה ישירות על מקום הפציעה •
                            דאג לאבטח את דרכי האוויר של הנפגע •
                            במידת האפשר נסה להרגיע נפגעי חרדה •
                            בצע פעולות החייאה בנפגעים שאינם מראים סימני חיים
                        </Text>
                    </ScrollView>

                    <View style={styles.btnSubmitView}>
                        <TouchableOpacity
                            style={styles.btnTH}
                            onPress={() => { props.navigation.navigate('Chat') }}>
                            <Text style={styles.submitText}>שיחה עם נציג</Text>
                        </TouchableOpacity >
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerText: {
        paddingBottom: 20,
        paddingTop: 35,
        color: '#FFFEFE',
        fontSize: 18,
    },
    contentContainer: {
        height: 350,
        width: 300,
    },
    phelp: {
        marginRight: 25,
        color: '#F6E8E8',
        fontSize: 12,
        textAlign: 'right',
    },
    btnSubmitView: {
        margin: 0,
        paddingTop: 50,
        paddingBottom: 50,
        alignItems: 'center',
        width: 140,
    },
    btnTH: {
        width: 140,
        padding: 14,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#FFFEFE',
        borderRadius: 20,
    },
    submitText: {
        fontSize: 13,
        color: 'black',
        textAlign: 'center',
    },
    logo: {
        alignItems: 'center',
        paddingTop: 50,
    },
    image: {
        width: 55,
        height: 55,
    },
})