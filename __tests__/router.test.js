/**
 * @jest-environment jsdom
 */

import { pushToHistory } from '../scripts/router.js';

describe('pushtoHistory tests', ()=>{
    describe('settings tests', ()=>{
        let history = pushToHistory('settings', 0);
        let historyLen = history.length;
        let state = history.state.page; 
        test('settings-history-length', () => {
            expect(historyLen).toBe(2);   
        });
        test('settings-current-state', () => {
            expect(state).toBe("settings");    
        });
    });

    describe('homepage tests', ()=>{
        let history = pushToHistory('', 0);
        let historyLen = history.length;
        let state = history.state; 
        test('homepage-history-length', () => {
            expect(historyLen).toBe(3);   
        });
        test('homepage-current-state', () => {
            expect(state).toEqual({});    
        });
    });

    describe('entry tests', ()=>{
        let history = pushToHistory('entry', 1);
        let historyLen = history.length;
        let state = history.state.page; 
        test('entry-history-length', () => {
            expect(historyLen).toBe(4);   
        });
        test('entry-current-state', () => {
            expect(state).toBe("entry1");    
        });
    });
});