export default class Gazepass {
    constructor(api_key, opts) {
        this.api_key = api_key;
        this.gpBaseUrl = "https://passwordless.gazepass.com";
        this.opts = opts ? opts : {};
    }

    signIn() {
        var popup_url = new URL(this.gpBaseUrl);
        popup_url.searchParams.append("client_id", this.api_key);

        var default_values = {
            "redirect_uri": window.location.href,
            "response_type": "code",
            "scope": "openid",
            "response_mode": "post_message",
            "nonce": "-",
            "code_challenge": null,
            "code_challenge_method": null
        };

        var param_names = Object.keys(default_values);
        for (let i = 0; i < param_names.length; i++) {
            let param = param_names[i];
            let default_val = default_values[param];

            if (this.opts[param]) {
                popup_url.searchParams.append(param, this.opts[param]);
            } else if (default_val) {
                popup_url.searchParams.append(param, default_val);
            }
        }

        var window_width = this.opts.window_width ? this.opts.window_width : 599;
        var window_height = this.opts.window_height ? this.opts.window_height : 599;
        var window_left = (window.screen.width / 2) - (window_width / 2);
        var window_top = (window.screen.height / 2) - (window_height / 2);

        var window_params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,status=no,resizable=no,
                            width=${window_width},height=${window_height},top=${window_top},left=${window_left}`;

        var window_obj = window.open(popup_url.toString(), "Passwordless Sign In", window_params);
        var closed_window = false;

        return new Promise((resolve, reject) => {
            if (window_obj) {
                window_obj.onbeforeunload = () => {
                    if (!closed_window) {
                        reject("popup_closed_by_user");
                    }
                }
            }

            var cb = async (event) => {
                if (event.origin != this.gpBaseUrl) {
                    return;
                }

                try {
                    var data = JSON.parse(event.data);
                } catch (e) {
                    return;
                }
                if (Object.keys(data).length < 1) {
                    return;
                }

                if (data.auth_mode) {
                    resolve(data);
                } else if (data.error) {
                    reject({
                        "error": data.error
                    });
                } else {
                    return;
                }

                closed_window = true;
                window_obj.close();

                try {
                    window.removeEventListener("message", cb);
                } catch (e) { }
            }

            window.addEventListener(
                "message",
                cb
            );
        });

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
                        reject("popup_closed_by_user");
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
