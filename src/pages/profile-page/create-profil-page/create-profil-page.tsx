import { View, Text, Button, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native";
import { styles } from './style'
import * as React from 'react'
import { TextInput } from 'react-native-paper';
import MomotoculteurTextInput from "../../../components/atoms/momotoculteur-text-input/momotoculteurTextInput";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import MomotoculteurCreateProfilForm from "../../../components/molecules/momotoculteur-create-profil-form/momotoculteurCreateProfilForm";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { IUser } from "../../../components/shared/interface/IUser";
import DatabaseManager from "../../../database/DatabaseManager";
import { useNavigation } from "@react-navigation/native";
import { validateCreateProfilFormService } from "../../../services/validateCreateProfilFormService";


interface iState {
    user: IUser;
}
interface IProps {
}
export default class CreateProfilePage extends React.Component<IProps, iState> {



    constructor(props: any) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                adress: '',
                city: '',
                birthdate: '',
                birthplace: '',
                postalCode: ''
            }
        }


    }

    getFirstname(newName: string): void {
        this.state.user.firstName = newName;
    }
    getLastname(newLastname: string): void {
        this.state.user.lastName = newLastname;
    }
    getBirthdate(newBirthday: string): void {
        this.state.user.birthdate = newBirthday;
    }
    getBirthplace(newBirthplace: string): void {
        this.state.user.birthplace = newBirthplace;
    }
    getAdress(newAdress: string): void {
        this.state.user.adress = newAdress;
    }
    getCity(newCity: string): void {
        this.state.user.city = newCity;
    }
    getPostalcode(newPostalcode: string): void {
        this.state.user.postalCode = newPostalcode;
    }

    validateForm(): void {

        if (this.state.user.firstName !== "" &&
            this.state.user.lastName !== "" &&
            this.state.user.adress !== "" &&
            this.state.user.city !== "" &&
            this.state.user.postalCode !== "" &&
            this.state.user.birthplace !== "" &&
            this.state.user.birthdate !== "") {
            this.createUser();
            this.props.navigation.goBack();
        } else {

            validateCreateProfilFormService.notifie();

            let errorListItem: string[] = [];
            let errorMessage: string = "";

            if (this.state.user.firstName === "") {
                errorListItem.push("Prénom");
            }
            if (this.state.user.lastName === "") {
                errorListItem.push("Nom");
            }
            if (this.state.user.birthdate === "") {
                errorListItem.push("Date de naissance")
            }
            if (this.state.user.birthplace === "") {
                errorListItem.push("Lieu de naissance");
            }
            if (this.state.user.adress === "") {
                errorListItem.push("Adresse");
            }
            if (this.state.user.postalCode === "") {
                errorListItem.push("Code postal");
            }
            if (this.state.user.city === "") {
                errorListItem.push("Ville");
            }

            errorListItem.forEach((err: string, index) => {
                errorMessage += err;
                if (index < errorListItem.length - 1) {

                    errorMessage += ", ";
                }
                if (index === errorListItem.length - 1) {
                    errorMessage += ".";
                }
            });


            Alert.alert(
                "Erreur champs requis",
                errorMessage,
                [
                    {
                        text: "Retour",
                        style: "cancel"
                    }
                ]
            )




        }


    }

    createUser(): void {
        DatabaseManager.insertUser(this.state.user);
    }


    render() {
        return (
            <View style={styles.global}>
                <View style={styles.viewFormGlobal}>
                    <KeyboardAwareScrollView style={{ flex: 1 }}>
                        <ScrollView
                            style={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled">
                            <View style={{ flex: 1, flexDirection: 'column', padding: '5%' }}>
                                <MomotoculteurTextInput getData={this.getFirstname.bind(this)} label="Prénom" mode="outlined" />
                                <MomotoculteurTextInput getData={this.getLastname.bind(this)} label="Nom" mode="outlined" />
                                <MomotoculteurTextInput getData={this.getBirthdate.bind(this)} label="Date de naissance" mode="outlined" />
                                <MomotoculteurTextInput getData={this.getBirthplace.bind(this)} label="Lieu de naissance" mode="outlined" />
                                <MomotoculteurTextInput getData={this.getAdress.bind(this)} label="Adresse" mode="outlined" />
                                <MomotoculteurTextInput getData={this.getPostalcode.bind(this)} label="Code postal" mode="outlined" />
                                <MomotoculteurTextInput getData={this.getCity.bind(this)} label="Ville" mode="outlined" />



                            </View>

                        </ScrollView>
                    </KeyboardAwareScrollView  >

                </View>
                <View style={styles.viewButtonSection}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={this.validateForm.bind(this)}
                        activeOpacity={0.7}>
                        <Text style={styles.textStyle}>Valider</Text>

                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}