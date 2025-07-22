import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import android.util.Log; 
import org.json.JSONArray;
import org.json.JSONException;

public class TetrisPlugin extends CordovaPlugin {
    private static final String TAG = "TetrisPlugin";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, "Пока ничего нативного не используем: " + action);
        callbackContext.success("Hey from JAva code for action: " + action + "; arg: " + args.getString(0));
        return false;
    }
}