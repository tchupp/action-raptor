import {App, ExpressReceiver} from "@slack/bolt";
import {RequestPromiseAPI} from "request-promise";
import {Pool} from "pg";

import {landingHandler, privacyHandler, supportHandler} from "./handlers/other.handler";

import {slashActionHandler} from "./handlers/slash_action.handler";
import {blockActionHandler} from "./handlers/block_action.handler";
import {oauthRedirectHandler} from "./handlers/auth.handler";
import {eventHandler} from "./handlers/event.handler";
import {setupReminders} from "./reminders";

export type AppDependencies = {
    pool: Pool
    rp: RequestPromiseAPI
};

export async function buildApp(dependencies: AppDependencies) {
    const receiver = new ExpressReceiver({signingSecret: process.env.SLACK_SIGNING_SECRET!});
    const app = new App({
        token: process.env.SLACK_TOKEN,
        receiver
    });

    receiver.router.post("/action", slashActionHandler(dependencies.pool));
    receiver.router.post("/action/block", blockActionHandler(dependencies.pool));
    receiver.router.get("/auth/redirect", oauthRedirectHandler(dependencies));
    receiver.router.post("/event", eventHandler(dependencies.pool));

    receiver.router.get("/", landingHandler);
    receiver.router.get("/privacy-policy", privacyHandler);
    receiver.router.get("/support", supportHandler);

    await setupReminders(dependencies.pool);

    return app;
}
