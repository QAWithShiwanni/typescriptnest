import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './world';
import * as fs from 'fs';

let browser: Browser;

BeforeAll(async function () {
    browser = await chromium.launch({
        headless: false
    })
    console.log('Chromium launched');
})
Before(async function (this: CustomWorld) {
    fs.mkdirSync('test-results/screenshots', { recursive: true });
    fs.mkdirSync('test-results/videos', { recursive: true });
    fs.mkdirSync('test-results/traces', { recursive: true });
    this.context = await browser.newContext({
        recordVideo: {
            dir: 'test-results/videos'
        }
    })
    this.page = await this.context.newPage();
    await this.context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true
    })
})
After(async function (this: CustomWorld, { pickle, result }) {
    const scenarioName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
    if (result?.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({
            path: `test-results/screenshots/${scenarioName}.png`,
            fullPage: true
        })
        await this.attach(screenshot, 'image/png');
        await this.context.tracing.stop({
            path: `test-results/traces/${scenarioName}.zip`
        })
    } else {
        await this.context.tracing.stop();
    }
    await this.context.close();
})
AfterAll(async function () {
    await browser?.close();
    console.log('Chromium closed');
})
