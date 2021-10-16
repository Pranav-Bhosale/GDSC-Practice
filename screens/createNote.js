import React from 'react';
import { Text,StyleSheet,View,TextInput,TouchableOpacity, Dimensions} from 'react-native';
import  firebaseConfig from "../config"; 
import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export default function page({navigation}) {
const [uid,setuid]=React.useState(null);
const [textdisplay , settext] = React. useState("");
const [title , settitle] = React. useState("");
const [note , setnote] = React. useState("");


onAuthStateChanged(auth, (user) => {
    if (user) {
     setuid(user.uid);
    } else {
        setuid(null);
        settext("User Auth Failed!!");
    }
  });
  async function  submitNote (){ 
try {

    const d = new Date();
    var timestamp=String(d.getFullYear()) 
    var month=String(d.getMonth()+1) ;
    var date=String(d.getDate());
    var hr=String(d.getHours());
    var min=String(d.getMinutes());
    var sec=String(d.getSeconds());
       if(month.length==1)
         month="0"+month;
       if(date.length==1)
         date="0"+date;
       if(hr.length==1)
         hr="0"+hr;
       if(min.length==1)
         min="0"+min;
       if(sec.length==1)
         sec="0"+sec;
         timestamp=timestamp+month+date+hr+min+sec;
    const docRef = await addDoc(collection(db, uid), {
      title: title,
      note: note,
      timestamp:timestamp
    });
    settext("Document written with ID: "+docRef.id);
    navigation.navigate("Your Notes");
  } catch (e) {
    settext("Error adding document: "+ e);
  }

 
}

        return(
            <View style={styles.page}>
                <Text style={styles.header}>Create Note</Text>
                <TextInput style={styles.title} onChange={(e) => settitle(e.target.value)} placeholder="Title" />
                <TextInput style={styles.textinput} onChange={(e) => setnote(e.target.value)} multiline={true} placeholder="Note"/>
                <TouchableOpacity onPress={submitNote}>
                    <View style={styles.button}>
                        <Text style={styles.buttontext}>Save</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate("Your Notes")}>
                    <View style={styles.button}>
                        <Text style={styles.buttontext}>Cancel</Text>
                    </View>
                </TouchableOpacity>
                <Text >{textdisplay}</Text>
                <Text style={styles.design}></Text>
            </View>
    );
}

const styles = StyleSheet.create({
    page: {
      backgroundColor: "#C9F5F3",
      width:Dimensions.get("window").width,
      height:Dimensions.get("window").height,
      alignItems: "center",
      justifyContent: "space-between",
    },
    header: {
        alignItems: "stretch",
        fontSize: 40,
        color: "#035C66",
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#21D2CC",
        width:Dimensions.get("window").width,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
     },
    title: {
        alignSelf: "center",
        height: 60,
        width:Dimensions.get("window").width-20,
        color: "#070707",
        fontSize: 28,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: "#070707",
        borderRadius: 10,
        shadowOffset: { width: 0, height: 1},
        shadowColor: "#035C66",
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    textinput: {
        alignSelf: 'center',
        height: 451,
        width:Dimensions.get("window").width-20,
        Color: "#070707",
        fontSize: 28, 
        paddingLeft: 10,
        paddingBottom: 400,
        justifyContent: "space-evenly",
        borderWidth: 1,
        borderColor: "#070707",
        borderRadius: 10,
        shadowOffset: { width: 0, height: 1},
        shadowColor: "#035C66",
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        width: 151,
        height: 48,
        borderWidth: 1,
        borderColor: "#707070",
        shadowOffset: { width: 0, height: 1},
        shadowColor: "#035C66",
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 6,
    },
    buttontext: {
        color: "#035C66",
        fontWeight: "semiBold",
        fontSize: 32,
        textAlign: "center",
    },
    design:{
        backgroundColor: "#21D2CC",
        height: 33,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width:Dimensions.get("window").width,
    },
});