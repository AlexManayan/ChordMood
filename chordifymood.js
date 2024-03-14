document.addEventListener('DOMContentLoaded', () => {
    let activkey;

    const getApiKey = async (username, password) => {
        try {
            const apiEndpoint = "https://api.hooktheory.com/v1/";
            const requestBody = { username, password };

            const response = await fetch(`${apiEndpoint}users/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (data.activkey) {
                activkey = data.activkey;
                console.log("API Key obtained:", activkey);
            } else {
                console.error("Failed to obtain API key:", data);
            }
        } catch (error) {
            console.error("Error during API key request:", error);
        }
    };

    const generateChordProgression = async (mood) => {
        try {
            if (!activkey) {
                console.error("API key is missing. Please ensure it's obtained before making requests.");
                return;
            }

            const headers = {
                Authorization: `Bearer ${activkey}`,
                'Content-Type': 'application/json'
            };

            const num = Math.floor(Math.random() * 10) + '';
            const url = `https://api.hooktheory.com/v1/trends/nodes?cp=${num}`;

            const response = await fetch(url, { headers });

            if (!response.ok) {
                console.error('Failed to fetch chord progression. Please check your API key and try again.');
                return;
            }

            const data = await response.json();

            const chordProgression = processChordProgression(data);
            displayChordProgression(chordProgression);

            const videoUrls = {
                happy: [
                    "C:\Users\alexm\Downloads\Coldplay - Viva la Vida (Lyrics).mp4",
                    "C:\Users\alexm\Downloads\Homecoming.mp4",
                    "C:\Users\alexm\Downloads\Manu Chao - Me Gustas Tu.mp4",
                    "C:\Users\alexm\Downloads\The Chainsmokers - Paris (Lyrics).mp4",
                    "C:\Users\alexm\Downloads\Maroon 5 - Sugar (Lyrics).mp4",
                    "C:\Users\alexm\Downloads\Payphone - Maroon 5, Ed Sheeran, Charlie Puth (Lyrics).mp4",
                    "C:\Users\alexm\Downloads\DNCE - Cake By The Ocean (Lyrics).mp4",
                    "C:\Users\alexm\Downloads\Happy Nation.mp4",
                    "C:\Users\alexm\Downloads\Justin Timberlake - Can't Stop The Feeling! [Lyrics].mp4",
                    // Add more video URLs for happy mood/genre
                ],
                sad: [
                    "C:\Users\alexm\Downloads\Creep - Radiohead (Lyrics).mp4",
                    "C:\Users\alexm\Downloads\Vacations - Telephones.mp4",
                    "C:\Users\alexm\Downloads\Swing Lynn (Official Audio).mp4",
                    "C:\Users\alexm\Downloads\Moonlight on the River.mp4",
                    "C:\Users\alexm\Downloads\cigarettes after sex - cry (lyrics).mp4",
                    "C:\Users\alexm\Downloads\Notion.mp4",
                    "C:\Users\alexm\Downloads\Mild High Club - Homage.mp4",
                    "C:\Users\alexm\Downloads\Beach House - Space Song (Lyrics).mp4",
                    "C:\Users\alexm\Downloads\øneheart x reidenshi - snowfall.mp4",
                    "C:\Users\alexm\Downloads\d4vd - Romantic Homicide (Lyrics).mp4",
                    // Add more video URLs for sad mood/genre
                ],
                chill: [
                    "C:\Users\alexm\Downloads\I Wonder.mp4",
                    "C:\Users\alexm\Downloads\Travis Scott - 90210 (Lyrics) Ft. Kacy Hill.mp4",
                    "C:\Users\alexm\Downloads\The Neighbourhood - Softcore (Lyrics) I'm too consumed with my own life.mp4",
                    "C:\Users\alexm\Downloads\PRIDE..mp4",
                    "C:\Users\alexm\Downloads\Riovaz - Prom Night (Lyrics).mp4",
                    "C:\Users\alexm\Downloads\Tame Impala - Let It Happen (Official Audio).mp4",
                    "C:\Users\alexm\Downloads\Travis Scott - SDP Interlude (Lyrics).mp4",
                    "C:\Users\alexm\Downloads\Runaway.mp4",
                    "C:\Users\alexm\Downloads\Joy Again - Looking Out For You.mp4",
                    "C:\Users\alexm\Downloads\@laufey - From The Start (Lyrics).mp4",
                    // Add more video URLs for chill mood/genre
                ],
                jazz: [
                    "C:\Users\alexm\Downloads\Autumn Leaves (Remastered).mp4",
                    "C:\Users\alexm\Downloads\Miles Davis - Freddie Freeloader (Official Audio).mp4",
                    "C:\Users\alexm\Downloads\Louis Armstrong - What A Wonderful World.mp4",
                    "C:\Users\alexm\Downloads\Take Five.mp4",
                    "C:\Users\alexm\Downloads\'Round Midnight.mp4",
                    "C:\Users\alexm\Downloads\So What.mp4",
                    "C:\Users\alexm\Downloads\All Blues.mp4",
                    "C:\Users\alexm\Downloads\West End Blues.mp4",
                    "C:\Users\alexm\Downloads\Just the Two of Us (feat. Bill Withers).mp4",
                    "C:\Users\alexm\Downloads\Horace Silver - Song for My Father.mp4",
                    // Add more video URLs for jazz mood/genre
                ],
            };

            const videos = videoUrls[mood];
            const randomIndex = Math.floor(Math.random() * videos.length);
            const randomVideoUrl = videos[randomIndex];

            displayVideo(randomVideoUrl);
        } catch (error) {
            console.error('Error during chord progression request:', error);
        }
    };

    const processChordProgression = (data) => {
        const chordProgression = data.map(node => node.chord_HTML);
        const cleanedChords = formatChordProgression(chordProgression);
        return cleanedChords;
    };

    const formatChordProgression = (chordProgression, minLength = 4, maxLength = 8) => {
        const chordMap = {
            "I": "C",
            "IV": "F",
            "vi": "Am",
            "V": "G",
            "ii": "Dm",
            "iii": "Em",
            "vi7": "Am7",
            "IV7": "F7",
            "I6": "C6",
            "V6": "G6",
            "V/vi": "G",
            "iii7": "Em7",
            "I64": "C6/4",
            "V7": "G7",
            "♭VII": "Bb",
            "I7": "C7",
            "V/V": "D",
            "vi64": "Am6/4",
            "IV64": "F6/4",
            "V7/vi": "G7",
            "IV6": "F6",
            "vi6": "Am6",
            "V64": "G6/4",
            "vi4/2": "Am",
            "ii6": "Dm6",
            "iii6": "Em6",
            "V6/vi": "G",
            "♭VI": "Ab",
            "iii64": "Em6/4",
            "♭III": "Eb",
            "ii6/5": "Dm6/5",
            "V4/2": "G",
            "iv": "Dm",
            "iii6/5": "Em6/5",
            "vii°": "Bdim",
            "ii64": "Dm6/4",
            "V/ii": "A",
            "V7/ii": "A7",
            "vii°/vi": "Bdim",
            "vi6/5": "Am6/5",
            "V7/V": "D7",
            "V7/IV": "C7",
            "ii4/2": "Dm",
            "vii7": "Bdim7",
            "ii7": "Dm7",
            // Chord mapping logic here
        };

        const cleanedChords = chordProgression.map(chord => {
            chord = chord.replace(/<\/?sup>/g, '');
            chord = chord.replace(/&#9837;/g, '♭');
            chord = chord.replace(/<sub>|<\/sub>/g, '');
            return chordMap[chord] || chord;
        });

        const limitedChords = cleanedChords.slice(0, 8);

        return limitedChords;
    };

    const displayChordProgression = (chordProgression) => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        const paragraph = document.createElement('p');
        paragraph.textContent = `Chord Progression: ${chordProgression.join(' ')}`;
        resultDiv.appendChild(paragraph);
    };

    const displayVideo = (videoUrl) => {
        const videoContainer = document.getElementById('video-container');
        videoContainer.innerHTML = `
            <video width="560" height="315" controls>
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    };

    const form = document.getElementById('mood-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const moodInput = document.getElementById('mood');
        const mood = moodInput.value;
        await generateChordProgression(mood);
    });

    const username = "alexmanayan";
    const password = "ManayanPiano21!";
    getApiKey(username, password);
});
