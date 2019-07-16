import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';

import MenuButton from '../components/MenuButton';
import LogoApp from '../components/LogoApp'
import Arrow from '../components/Arrow';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        console.log('Chat param=', this.props.navigation.state.params)
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

                        <Text style={styles.headerText}>צא'ט עם נציג</Text>
                    </View>
                    <View style={styles.chats}>

                        {/*  Representor */}
                        <View style={styles.chatContainer}>
                            <View style={styles.iconView}>
                                <Image style={styles.iconRep} source={require('../assets/images/chat.png')} />
                            </View>
                            <View style={styles.p}>
                                <Text style={styles.chatText}>במה אוכל לעזור?</Text>
                            </View>
                        </View>

                        {/*  Client  */}

                        <View style={styles.chatContainers}>
                            <View style={styles.iconView}>
                                <Image style={styles.iconCli} source={require('../assets/images/man.png')} />
                            </View>
                            <View style={styles.ps}>
                                <Text style={styles.chatText}>הבן אדם התעלף</Text>
                            </View>
                        </View>

                        {/*  Representor */}

                        <View style={styles.chatContainer}>
                            <View style={styles.iconView}>
                                <Image style={styles.iconRep} source={require('../assets/images/chat.png')} />
                            </View>

                            <View style={styles.p}>
                                <ScrollView style={{ height: 200, width: 250 }}>
                                    <Text style={styles.chatText}>תעשה החייאה אם האדם מחוסר הכרה,{"\n"}
                                        טפחו על כתפו או טלטלו אותו קלות ושאלו אותו בקול רם,{"\n"}
                                        'האם אתה בסדר?' השכיבו את האדם על גבו על גבי מצע קשיח.{"\n"}
                                        אם קיים חשש לפגיעה בעמוד השדרה היעזרו באדם נוסף כדי למנוע טלטול של הראש והצוואר.{"\n"}
                                        הניחו את שורש כף היד במרכז החזה (על עצם בית החזה),{"\n"}
                                        בין הפטמות, של האדם שהתמוטט. הניחו את כף היד השניה על גבי הראשונה.{"\n"}
                                        ישרו את המרפקים, ומקמו את כתפיכם ישירות מעל כפות ידיכם.{"\n"}
                                        השתמשו במשקל גופכם העליון תוך שאתם לוחצים על חזהו של האדם, ישר כלפי מטה, לעומק כ- 5 סנטימטרים.{"\n"}
                                        לחצו חזק ומהר, בקצב של כ- 100 לחיצות בדקה.{"\n"}
                                        ספרו את הלחיצות בקול רם.{"\n"}
                                        אם אינכם מיומנים בביצוע פעולות החייאה,{"\n"}
                                        המשיכו לבצע לחיצות חזה עד להגעת צוותי החירום.{"\n"}
                                        אם אתם מיומנים בביצוע פעולות החייאה,{"\n"}
                                        בצעו 30 לחיצות חזה והמשיכו לבדיקת דרכי האוויר וביצוע הנשמות.{"\n"}
                                        {"\n"}{"\n"}{"\n"}{"\n"}
                                    </Text>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        )
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
    logo: {
        alignItems: 'center',
        paddingTop: 50,
    },
    image: {
        width: 55,
        height: 55,
    },
    chats: {
        textAlign: 'center',
    },
    chatContainer: {
        width: 338,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 0,
        marginBottom: 0,
        marginRight: 35,
        marginLeft: 35,
        textAlign: 'right',
        paddingTop: 20,
    },
    chatContainers: {

        width: 338,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 0,
        marginBottom: 0,
        marginRight: 35,
        marginLeft: 35,
        textAlign: 'left',
        paddingTop: 20,
    },
    iconView: {

        textAlign: 'right',
        color: 'white',
    },
    iconRep: {
        width: 54,
        height: 63,
    },
    iconCli: {
        width: 55,
        height: 55,
    },
    p: {
        backgroundColor: '#54ECF5',
        borderTopLeftRadius: 33,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 33,
        borderBottomRightRadius: 33,
        padding: 10,
        textAlign: 'left',
        width: 270,
    },
    ps: {
        backgroundColor: '#CEFFF0',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 33,
        borderBottomLeftRadius: 33,
        borderBottomRightRadius: 33,
        padding: 10,
        textAlign: 'right',
        width: 270,
    },
    chatText: {
        fontSize: 14,
        marginTop: 10,
    },
})