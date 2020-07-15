import React, {useLayoutEffect} from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, TouchableOpacity, ToastAndroid, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Ionicons';

function Template1 ({route, navigation}) {
    const path = RNFS.DownloadDirectoryPath + `/${route.params.domain_name}.html`;
    const requestStoragePermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Storage Permission",
              message:
                "Cool Photo App needs access to your storage " +
                "so you can download this landing page.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can write");
          } else {
            console.log("write storage permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };
    const DownloadHtml = () => {
        requestStoragePermission();
        RNFS.writeFile(path, renderHtml(), 'utf8')
        .then((success) => {
            ToastAndroid.show('Downloaded to /storage/emulated/0/Download/', ToastAndroid.SHORT);
        })
        .catch((err) => {
            ToastAndroid.show(err, ToastAndroid.SHORT);
        });
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={DownloadHtml}>
                        <Icon name='download-outline' size={30} style={{padding:10}}/>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const renderHtml = () => {
        return `<html>
            <head><meta charset="utf-8">
                <title>Sales Inquery || ${route.params.domain_name}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
                <link href="https://fonts.googleapis.com/css?family=Mukta+Mahee:300,700" rel="stylesheet">
                <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
                <script src='https://www.google.com/recaptcha/api.js'></script>
            </head>
            <body><section class="bg-alt hero p-0">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm bg-faded text-center col-fixed">
                            <div class="vMiddle">
                            <h1 class="pt-4 h2">
                                <span class="text-green">${route.params.domain_name}</span>
                                <small>available for sale</small>
                            </h1>
                            <p class="mt-4">
                                For instantly purchase. Please make an order.
                            </p>
                            <div class="pt-5">
                                <label for="name">
                                <a class="btn text-white bg-green btn-lg">Buy now for $${route.params.price}</a>
                                </label>
                            </div>
                            <div class="row text-center justify-content-center pt-5">
                                <div class="col-sm-4">
                                    <p><em class="ion-ios-telephone-outline icon-md"></em></p>
                                    <p class="lead"><a href="tel:+[Your Phone]">+[Your Phone]</a></p>
                                </div>
                                <div class="col-sm-4">
                                    <p><em class="ion-ios-chatbubble-outline icon-md"></em></p>
                                    <p class="lead"><a href="mailto:email@[Your Domain].com">email@[Your Domain].com</a></p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
            </body>
            <style>${styles}</style>
            </html>`
    }

    return (
        <View style={style.container}>
        <WebView
            source={{ html: renderHtml() }}
            javaScriptEnabled = {true}
            automaticallyAdjustContentInsets={false}
            style={{margin:0, padding:0}}
            startInLoadingState={true}
        />
        </View>
    );
};

const style = StyleSheet.create({
  container: {
    flex: 1
  }
});

const styles = `
html {
  font-size: 16px;
}
html,
body {
    width: 100%;
    height: 100%;
}
body{
    font-family: 'Mukta Mahee', sans-serif;
    color: #222;
    line-height: 1.5;
    font-size: 1.125rem;
}
button, input, optgroup, select, textarea{
    font-family: 'Mukta Mahee', sans-serif;
}
.brand-logo{
    width: 180px;
}
.hero{
    height: 100vh;
    min-height: 700px;
}
.hero h1 span{
    font-size: 3rem;
    font-weight: 700;
}
.hero h1 small{
    font-weight: 300;
    display: block;
    font-size: 2.5rem;
}
a {
    color: #00c853;
    -webkit-transition: all .35s;
    -moz-transition: all .35s;
    transition: all .35s;
}
a:hover,
a:focus {
    color: #009624 !important;
    outline: 0;
    text-decoration: none !important;
}
a.btn:hover,
a.btn:focus {
    color: #fff !important;
}
section{
    padding: 0;
}
.card-outline-primary{
    border-color: #00c853;
}
.hero .row {
  align-items: center;
}
.height-100 {
  height: 100vh;
}
.col-fixed{
    padding-bottom: 100px;
    align-items: center;
    display: flex;
    justify-content: center;
}
.vMiddle,
#main-offer-form {
  max-width: 40rem;
  width: 100%;
  margin: 0 auto;
}
@media (min-width:576px){
    .col-fixed{
        position: fixed;
        top: 0;
        bottom: 0;
    }
}
.form-control{
    height: 3rem;
}
textarea.form-control {
  height: 6rem;
}

.form-control:hover, .form-control:focus{
    border-color: #00c853;
}
/*===============================================
* Background Colors
================================================*/
.bg-alt {
    background-color: #fff;
}
.bg-faded{
    background-color: #F2F2F2;
}
.bg-blue{
    background-color: #032EFF !important;
}
.bg-primary{
    background-color: #00c853 !important;
}
.bg-purple{
    background-color: #3d5afe;
}
.bg-orange{
    background-color: #ffea00;
}
.bg-yellow{
    background-color:#feac00;
}
.bg-pink{
    background-color:#ff0080;
}
.bg-green{
    background-color:#00c853;
}
.bg-red{
    background-color:#FF3B30;
}
.bg-violet{
    background-color: #7B1FA2;
}
.bg-teal{
    background-color: #00796B;
}
.bg-slate{
    background-color: #455A64;
}
.bg-indigo{
    background-color: #303F9F;
}
/*===============================================
* Text Colors
================================================*/
.text-faded {
    color: #D9EDF7;
}
.text-dark {
    color: #37474F;
}
.text-muted{
    color: #999 !important;
}
.text-light {
    color: #fff;
}
.text-light:hover,.text-light:focus {
    color: #eee;
    text-decoration:none;
}
.text-primary {
    color: #00c853 !important;
}
.text-purple{
    color: #3d5afe !important;
}
.text-orange{
    color: #ffea00 !important;
}
.text-yellow{
    color:#feac00 !important;
}
.text-pink{
    color:#ff0080 !important;
}
.text-green{
    color:#00c853 !important;
}
.text-red{
    color:#FF3B30 !important;
}
.text-violet{
    color: #7B1FA2 !important;
}
.text-teal{
    color: #00796B !important;
}
.text-slate{
    color: #455A64 !important;
}
.text-indigo{
    color: #303F9F !important;
}
/*===============================================
* Icon Sizes
================================================*/
label{
  margin: 0;
}
.action-icons {
  position: absolute;
  bottom: 4rem;
  width: 100%;
  left: 0;
}
.icon-lg {
    font-size: 60px;
    line-height: 18px;
}
.icon-md {
    font-size: 2.5rem;
    line-height: 14px;
}
.icon-sm {
    font-size: 30px;
    line-height: 14px;
}
.action-icons .lead {
  font-size: 1rem;
  margin-top: -.5rem;
}
.form-control-feedback {
  font-size: .875rem;
}
/*===============================================
* Colored Buttons
================================================*/
.btn {
    font-weight: 700;
    cursor: pointer;
}
.btn-outline-white {
    color: #fff !important;
    background-image: none;
    background-color: transparent;
    border-color: #fff;
}
.btn-outline-white:hover {
    background: rgba(255, 255, 255, 0.2) !important;
}
.btn-white {
    color: #00c853;
    background-color: #fff;
    border-color: #fff;
}
.btn-white:hover {
    background: transparent !important;
    color: #fff !important;
}
.btn-radius{
    border-radius: 50px;
}
.border-none{
    border: none !important;
    border-color: transparent !important;
}
`

export default Template1;