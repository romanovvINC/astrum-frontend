import "./App.css";
import CustomizerProvider from "./_helper/customizer/CustomizerProvider";
import Routes from "./Routes";
import PhotoPreviewProvider from "./contexts/PhotoPreviewContext";

function App() {
    return (
        <CustomizerProvider>
            <PhotoPreviewProvider>
                <div className="App">
                    <Routes />
                </div>
            </PhotoPreviewProvider>
        </CustomizerProvider>
    );
}

export default App;
