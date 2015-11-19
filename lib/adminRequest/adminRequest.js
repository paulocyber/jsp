/**
 * Created by SERVIDOR on 06/11/2015.
 */
adminCallback = null; //variavel global / handle de função que vai pedir previlegio admin

AdminCallbackObejct = function(success,sucessMsg,fail,failMsg)  {
    this.successCall = success;
    this.failCall = fail;
    this.successMesg = sucessMsg;
    this.failMsg = failMsg;


};