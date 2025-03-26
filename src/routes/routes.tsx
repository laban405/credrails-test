import { lazy } from "react";
import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import Layout from "@/layouts/layout";
import AppLayout from "@/layouts/app-layout";

const LoginPage = lazy(() => import("../pages/login-page"));
const SignUpPage = lazy(() => import("../pages/sign-up-page"));
const FileUploadPage = lazy(() => import("../pages/file-upload-page"));
const FileDetailsPage = lazy(() => import("../pages/file-details-page"));
const HomePage = lazy(() => import("../pages/home-page"));


const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "details",
        element: <FileDetailsPage />,
      },
      {
        path: "upload",
        element: <FileUploadPage />,
      },
 
    ],
  },
];

export const router = createBrowserRouter(routes);