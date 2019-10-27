import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import { main } from "./NotFound.module.scss";

export const NotFound = props => {
  return (
    <MainLayout title="Bad doggo">
      <main className={main}>
        <h2>Hey Fido, stop chewing that!</h2>
        <img src="img/404.png" alt="Bad doggo" />
        <p>sorry, apparently fido ate this page</p>
      </main>
    </MainLayout>
  );
};
