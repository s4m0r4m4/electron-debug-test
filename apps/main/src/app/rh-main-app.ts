/******************************************************************************
* File: rh-main-app.ts
* Author: Sam Schreiner
* Date: April 22 2020
******************************************************************************/
import { BrowserWindow, dialog, screen, WebPreferences } from 'electron';
import { join } from 'path';
import { format } from 'url';
import { RHMainEnvironment } from '../environments/environment.debug';
/******************************************************************************
* Class: RHMainApp
******************************************************************************/
export class MyMainApp {

    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
    private static m_cMainWindow: Electron.BrowserWindow | null;
    private static m_cApplication: Electron.App;

    /******************************************************************************
    * Function: main
    ******************************************************************************/
    public static async main(appIn: Electron.App) {

        MyMainApp.m_cApplication = appIn;

        // Disable CORS for testing to log server
        if (!RHMainEnvironment.IsProduction) {

            appIn.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

            // these settings can be used for chromium debugging
            // appIn.commandLine.appendSwitch('no-sandbox');
            // appIn.commandLine.appendSwitch('vmodule=metrics=2');
            // appIn.commandLine.appendSwitch('v', '1');
            // appIn.commandLine.appendSwitch('enable-logging');
            // https://chromium.googlesource.com/chromium/src.git/+/master/docs/gpu/debugging_gpu_related_code.md
            // appIn.commandLine.appendSwitch('enable-gpu-client-logging', 'true');
            // appIn.commandLine.appendSwitch('enable-logging', 'stderr');

        }

        // set javascript heap memory
        appIn.commandLine.appendSwitch('js-flags', '--max-old-space-size=6144');
        appIn.commandLine.appendSwitch('disable-http-cache');

        // set up authentication negotiation whitelists
        appIn.commandLine.appendSwitch('AuthNegotiateDelegateWhitelist', '*.mmm.com,localhost');
        appIn.commandLine.appendSwitch('AuthServerWhitelist', '*.mmm.com,localhost');

        // Avoid quitting when all windows are closed, this is handled by Main window event closed
        MyMainApp.m_cApplication.on('window-all-closed', (cEvent: Event) => cEvent.preventDefault());

        // App is ready to load data
        MyMainApp.m_cApplication.on('ready', MyMainApp.onReady);

    }

    /******************************************************************************
    * Function: onReady
    ******************************************************************************/
    private static async onReady() {

        try {

            MyMainApp.initMainWindow();

            MyMainApp.loadMainWindow();

        } catch (cEx) {

            console.log('General Ex: ' + cEx);

            // TODO: register this dialog as a log-listener for errors only
            dialog.showErrorBox(
                'ERROR_ON_LOAD',
                `ERROR_ON_LOAD: \n\n ${cEx} \n${cEx.stack}`);

            // Close the application
            MyMainApp.m_cApplication.quit();

        }

    }

    /******************************************************************************
    * Function: initMainWindow
    ******************************************************************************/
    private static initMainWindow() {

        let cWorkAreaSize: Electron.Size;
        let nWidth: number;
        let nHeight: number;
        let nOffsetX: number;
        const nOffsetY: number = 0;

        cWorkAreaSize = screen.getPrimaryDisplay().workAreaSize;
        nWidth = cWorkAreaSize.width;
        nHeight = cWorkAreaSize.height;
        nOffsetX = 0;

        const cWebPreferences: WebPreferences = {
            nodeIntegration: true, // TODO: look into this one
            backgroundThrottling: false,
            allowRunningInsecureContent: false,
            // v8CacheOptions: "none"
        };

        if (true) {
            // used to bypass CORS for log upload, only needed for dev
            cWebPreferences.webSecurity = false;
        }

        // Create the browser window.
        MyMainApp.m_cMainWindow = new BrowserWindow(
            {
                width: nWidth,
                height: nHeight,
                x: nOffsetX,
                y: nOffsetY,
                show: false,
                webPreferences: cWebPreferences
            });

        // if main window is ready to show, close the splash window and show the main window
        MyMainApp.m_cMainWindow.once('ready-to-show', () => {
            MyMainApp.m_cMainWindow?.show();
        });

        // Emitted when the window is closed.
        MyMainApp.m_cMainWindow.on('closed', async (evt: Event) => {
            evt.preventDefault();
            MyMainApp.m_cApplication.quit();
        });

    }

    /******************************************************************************
    * Function: loadMainWindow
    ******************************************************************************/
    private static loadMainWindow() {

        // load the index.html of the app.
        if (!MyMainApp.m_cApplication.isPackaged) {

            MyMainApp.m_cMainWindow?.loadURL(`http://localhost:${RHMainEnvironment.RendererAppPort}`);
            MyMainApp.m_cMainWindow?.webContents.openDevTools();

        } else {

            MyMainApp.m_cMainWindow?.loadURL(format({
                pathname: join(__dirname, RHMainEnvironment.RendererAppRelativePath, 'index.html'),
                protocol: 'file:',
                slashes: true
            }));

        }

    }

    /******************************************************************************
    * Function: restoreWindow
    ******************************************************************************/
    public static restoreWindow() {

        if (MyMainApp.m_cMainWindow) {

            if (MyMainApp.m_cMainWindow.isMinimized()) {
                MyMainApp.m_cMainWindow.restore();
            }
            MyMainApp.m_cMainWindow.focus();

        }

    }

}
