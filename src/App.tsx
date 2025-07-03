import { MainLayout } from "./pages/mainLayout"
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homePage";
import { ChatPage } from "./pages/chatPage";
import { ErrorPage } from "./pages/errorPage";
export const App = () => {
  return <div>

    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Route>
    </Routes>
  </div>
}