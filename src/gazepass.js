
export class Gazepass {
    constructor(api_key) {
        this.api_key = api_key;
        this.gpBaseUrl = "https://passwordless.gazepass.com";
    }

    getAccessToken() {
        return new Promise((resolve, reject) => {
            let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,status=no,resizable=no,
                width=1080,height=720`;
            var popupUrl = this.gpBaseUrl + "/?api_key=" + encodeURIComponent(this.api_key);
            var openedWindow = window.open(popupUrl, "Passwordless Sign In", params);
            var closed = false;
            
            if (openedWindow) {
                openedWindow.onbeforeunload = () => {
                    if (!closed) {
                        reject("USER_CANCELLED");
                    }
                }
            }
    
            var cb = async (event) => {
                try {
                    var data = JSON.parse(event.data);
                } catch (e) {
                    return;
                }
    
                if (!("gazePassAccessId" in data)) {
                    return;
                }
    
                resolve(data["gazePassAccessId"]);
    
                closed = true;
                openedWindow.close();
                try {
                    window.removeEventListener("message", cb);
                } catch (e) { }
            };
    
            window.addEventListener(
                "message",
                cb
            );
        });
    }
}
