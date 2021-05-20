describe('Basic user flow for SPA ', () => {
      beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500');
        //await page.waitForNavigation();
      });

      // test 1 is given
      it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
        const numEntries = await page.$$eval('journal-entry', (entries) => {
          return entries.length;
        });
        expect(numEntries).toBe(10);
      });

      //test 2 is given
      it('Test2: Make sure <journal-entry> elements are populated', async () => {
        let allArePopulated = true;
        let data, plainValue;
        const entries = await page.$$('journal-entry');
        for (let i = 0; i < entries.length; i++) {
          data = await entries[i].getProperty('entry');
          plainValue = await data.jsonValue();
          if (plainValue.title.length == 0) { allArePopulated = false; }
          if (plainValue.date.length == 0) { allArePopulated = false; }
          if (plainValue.content.length == 0) { allArePopulated = false; }
        }
        expect(allArePopulated).toBe(true);
      }, 30000);

      it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
        // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
        const entries = await page.$$('journal-entry');
        await entries[0].evaluate(element => element.click());
        const url = await page.url().split('/');
        const path = url[url.length - 1];
        expect(path).toBe("#entry1");

      });

      it('Test4: On first Entry page - checking page header title', async () => {
        // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
        const header = await page.$eval("h1", element => element.textContent);
        expect(header).toBe("Entry 1");
      });

      it('Test5: On first Entry page - checking <entry-page> contents', async () => {
        /*
         implement test5: Clicking on the first journal entry should contain the following contents: 
            { 
              title: 'You like jazz?',
              date: '4/25/2021',
              content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
              image: {
                src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
                alt: 'bee with sunglasses'
              }
            }
          */
        const entry = await page.$('entry-page');
        let data, plainValue;
        let correctContents = true;
        let entry1 = {
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
        data = await entry.getProperty('entry');
        plainValue = await data.jsonValue();
        if (plainValue.title != entry1.title) {
          correctContents = false;
        }
        if (plainValue.date != entry1.date) {
          correctContents = false;
        }
        if (plainValue.content != entry1.content) {
          correctContents = false;
        }
        if (plainValue.image.src != entry1.image.src) {
          correctContents = false;
        }
        if (plainValue.image.alt != entry1.image.alt) {
          correctContents = false;
        }

        expect(correctContents).toBe(true);

      }, 10000);

      it('Test6: On first Entry page - checking <body> element classes', async () => {
        // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
        const body = await page.$eval('body', element => element.getAttribute('class'));
        expect(body).toBe("single-entry");

      });

      it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
        // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
        await page.$eval('img', element => element.click());
        const url = await page.url().split('/');
        const path = url[url.length - 1];
        expect(path).toBe("#settings");

      });

      it('Test8: On Settings page - checking page header title', async () => {
        // implement test8: Clicking on the settings icon should update the header to be “Settings”
        const header = await page.$eval("h1", element => element.textContent);
        expect(header).toBe("Settings");

      });

      it('Test9: On Settings page - checking <body> element classes', async () => {
        // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
        const body = await page.$eval('body', element => element.getAttribute('class'));
        expect(body).toBe("settings");
      });

      it('Test10: Clicking the back button, new URL should be /#entry1', async () => {
        // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
        await page.goBack();
        const url = await page.url().split('/');
        const path = url[url.length - 1];
        expect(path).toBe("#entry1");
      });

      // define and implement test11: Clicking the back button once should bring the user back to the home page
      it('Test11: Clicking the back button once should bring the user back to the home page', async () => {
        await page.goBack();
        const url = await page.url().split('/');
        const path = url[url.length - 1];
        expect(path).toBe("");
      });

      // define and implement test12: When the user is on the homepage, the header title should be “Journal Entries”
      it('Test 12: When the user is on the homepage, the header title should be “Journal Entries”', async () => {
        const header = await page.$eval("h1", element => element.textContent);
        expect(header).toBe("Journal Entries");
      });


      // define and implement test13: On the home page the <body> element should not have any class attribute 
      it('Test13: On the home page the <body> element should not have any class attribute', async () => {
        const body = await page.$eval('body', element => element.getAttribute('class'));
        expect(body).toBe("");
      });

      // define and implement test14: Verify the url is correct when clicking on the second entry
      it('Test 14:  Verify the url is correct when clicking on the second entry', async () => {
        const entries = await page.$$('journal-entry');
        await entries[1].evaluate(element => element.click());
        const url = await page.url().split('/');
        const path = url[url.length - 1];
        expect(path).toBe("#entry2");
      });

      // define and implement test15: Verify the title is current when clicking on the second entry
      it('Test 15: Verify the title is current when clicking on the second entry', async () => {
        const header = await page.$eval("h1", element => element.textContent);
        expect(header).toBe("Entry 2");
      });

      // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
      it('Test 16: Verify the entry page contents is correct when clicking on the second entry', async () => {
        const entry = await page.$('entry-page');
        let data, plainValue;
        let correctContents = true;
        let entry2 = {
          title: 'Run, Forrest! Run!',
          date: '4/26/2021',
          content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
          image: {
            src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
            alt: 'forrest running'
          }
        }
        data = await entry.getProperty('entry');
        plainValue = await data.jsonValue();
        if (plainValue.title != entry2.title) {
          correctContents = false;
        }
        if (plainValue.date != entry2.date) {
          correctContents = false;
        }
        if (plainValue.content != entry2.content) {
          correctContents = false;
        }
        if (plainValue.image.src != entry2.image.src) {
          correctContents = false;
        }
        if (plainValue.image.alt != entry2.image.alt) {
          correctContents = false;
        }

        expect(correctContents).toBe(true);
      }, 10000);

      // test 17: on page2: go back to home page and check url go back check contents
      it('Test17: Clicking the back button once should bring the user back to the home page', async () => {
        await page.goBack();
        const url = await page.url().split('/');
        const path = url[url.length - 1];
        expect(path).toBe("");
      });

      // test 18: go forward and check url for entry2
      it('Test18: On the home page click forward button should bring the user back to entry 2', async () => {
        await page.goForward();
        const url = await page.url().split('/');
        const path = url[url.length - 1];
        expect(path).toBe("#entry2");
      });

      //Test 19: click on the header and check homepage url is correct
      it('Test19: click on the header and verify user is on the homepage ', async () => {
        await page.$eval('h1', element => element.click());
        const url = await page.url().split('/');
        const path = url[url.length - 1];
        expect(path).toBe("");
      });
      
      // test 20: click on entry4 and check for correct entry3 in url
      it('Test20: go back to homepage and click on entry 3 and verify correct url', async () => {
        const entries = await page.$$('journal-entry');
        await entries[3].evaluate(element => element.click());
        const url = await page.url().split('/');
        const path = url[url.length - 1];
        expect(path).toBe("#entry4");
      });

      // test 21: check entry4 contents are correct, check for correct audio
      it('Test 21:  Verify the entry page contents is correct when clicking on the fourth entry', async () => {
          const entry = await page.$('entry-page');
          let data, plainValue;
          let correctContents = true; 
          let entry4 = {
            date: "4/28/2021",
            title: "You're a wizard, Harry",
            content: "Hmm, difficult. VERY difficult. Plenty of courage, I see. Not a bad mind, either. There's talent, oh yes. And a thirst to prove yourself. But where to put you? Not Slytherin. Not Slytherin. Not Slytherin, eh? Are you sure? You could be great, you know. It's all here in your head. And Slytherin will help you on the way to greatness, there's no doubt about that. No? Please, please. Anything but Slytherin, anything but Slytherin. Well if you're sure, better be... GRYFFINDOR!",
            image: {
              src: "https://w7w5t4b3.rocketcdn.me/wp-content/uploads/2019/01/harry-potter-sorting-hat-wrong.jpg",
              alt: "harry looking up at the sorting hat" 
            },
            audio:"https://drive.google.com/uc?export=download&id=1Orwnly-OMhNt83tb-SAWt6Y3S6AYQgkk"
          };
          data = await entry.getProperty('entry');
          plainValue = await data.jsonValue();
          if (plainValue.title != entry4.title) {
            correctContents = false;
          }
          if (plainValue.date != entry4.date) {
            correctContents = false;
          }
          if (plainValue.content != entry4.content) {
            correctContents = false;
          }
          if (plainValue.image.src != entry4.image.src) {
            correctContents = false;
          }
          if (plainValue.image.alt != entry4.image.alt) {
            correctContents = false;
          }
          if (plainValue.audio != entry4.audio) {
            correctContents = false;
          }

          expect(correctContents).toBe(true);
        });
});