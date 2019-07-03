import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';

import MenuButton from '../components/MenuButton';
import LogoApp from '../components/LogoApp';
import Arrow from '../components/Arrow';

export default class RealTime extends React.Component {
    constructor(props) {
        super(props);
        console.log('RealTime param=', this.props.navigation.state.params)
    }
    render() {
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
                        <Arrow handlePress={() => {
                            const userId = this.props.navigation.state.params;
                            const replaceAction = StackActions.replace({
                                index: 0,
                                routeName: 'MainApp',
                                actions: NavigationActions.navigate('MainApp'),
                                params: userId,
                            });
                            this.props.navigation.dispatch(replaceAction)
                        }} />

                        <Text style={styles.headerText}>הוראות עזרה בזמן אמת</Text>

                        <ScrollView style={{ height: 400, width: 350 }}>

                            <Text style={styles.phelp}>
                                • דאג לבטיחותך ושמור על קור רוח {"\n"}
                                • החנה את הרכב לצד הדרך באופן שלא יפריע להגעת שרותי ההצלה ולזרימת התנועה {"\n"}
                                • הדלק פנסי מצוקה, הצב משולש אזהרה ולבש אפוד זיהוי זוהר {"\n"}
                                • צור קשר עם הסובבים אותך ובדוק האם יש נפגעים {"\n"}
                                • חייג מייד 101 והזעק את צוותי מד"א {"\n"}
                                • התקשר לכוחות הצלה נוספים (משטרה, מכבי אש) {"\n"}
                                • הגש עזרה ראשונה עפ"י הכשרתך בפנייתך לקבלת עזרה ממוקד 101 של מגן דוד אדום יש למסור את הפרטים הבאים: {"\n"}
                                • מספר הטלפון ממנו אתה מתקשר {"\n"}
                                • כתובת מדויקת של מקום האירוע {"\n"}
                                • מספר הנפגעים {"\n"}
                                • האם ישנם סיכונים סביבתיים כגון שריפה/ לכודים/ פיצוץ ? {"\n"}
                                • דווח על סיכונים נוספים כמו חוטי חשמל קרועים, חומרים מסוכנים וכדומה {"\n"}
                                • ענה בסבלנות לשאלות המוקדן, לכל שאלה יש סיבה! אין לחלץ נפגעים מהרכב פרט למקרים הבאים: {"\n"}
                                • אם צפויה לנפגע סכנה בעקבות דליקה {"\n"}
                                • אם קיימת מעורבות של חומרים מסוכנים {"\n"}
                                • אם קיים לחץ של הרכב על גוף הנפגע {"\n"}
                                • אם קיימת סכנה מוחשית לחייו של הנפגע ולא ניתן לטפל בו ברכב טפל בנפגעים עפ"י הכשרתך {"\n"}
                                • השתמש בערכה לעזרה ראשונה- אם קיימת ברכב {"\n"}
                                • במקרה של דליקה השתמש במטף לכיבוי דליקה מבלי לסכן את הנפגעים {"\n"}
                                • עצור דימומים פורצים באמצעות חבישה ישירות על מקום הפציעה {"\n"}
                                • דאג לאבטח את דרכי האוויר של הנפגע {"\n"}
                                • במידת האפשר נסה להרגיע נפגעי חרדה {"\n"}
                                • פעולות החייאה בנפגעים שאינם מראים סימני חיים{"\n"}
                                {"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}
                            </Text>
                        </ScrollView>

                        <View style={styles.btnSubmitView}>
                            <TouchableOpacity
                                style={styles.btnTH}
                                onPress={() => {
                                    const navigationActions = NavigationActions.navigate({
                                        routeName: 'Chat',
                                        params: this.props.navigation.state.params,
                                    });
                                    this.props.navigation.dispatch(navigationActions)
                                }}>
                                <Text style={styles.submitText}>שיחה עם נציג</Text>
                            </TouchableOpacity >
                        </View>
                    </View>
                </LinearGradient>
            </View>
        );
    }
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