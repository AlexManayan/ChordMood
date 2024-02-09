const spotifyApi = new SpotifyWebApi({
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET'
  });
  
  const getSpotifyPlaylists = async (mood) => {
    try {
      const token = await spotifyApi.clientCredentialsGrant();
      spotifyApi.setAccessToken(token.body['access_token']);
  
      const searchResults = await spotifyApi.search(`mood:${mood}`, ['playlist']);
      const playlists = searchResults.playlists.items.filter(item => item.owner.id !== 'spotify');
  
      displayPlaylists(playlists);
    } catch (error) {
      console.log('Error getting Spotify playlists:', error);
    }
  };
  
  const displayPlaylists = (playlists) => {
    const playlistContainer = document.getElementById('playlist-container');
    playlistContainer.innerHTML = '';
  
    if (playlists.length === 0) {
      const noResultsText = document.createElement('p');
      noResultsText.textContent = 'No playlists found for this mood.';
      playlistContainer.appendChild(noResultsText);
      return;
    }
  
    playlists.forEach(playlist => {
      const playlistDiv = document.createElement('div');
      playlistDiv.classList.add('playlist');
  
      const playlistTitle = document.createElement('h3');
      playlistTitle.textContent = playlist.name;
      playlistDiv.appendChild(playlistTitle);
  
      const playlistDescription = document.createElement('p');
      playlistDescription.textContent = playlist.description || '';
      playlistDiv.appendChild(playlistDescription);
  
      const playlistImage = document.createElement('img');
      playlistImage.src = playlist.images[0] ? playlist.images[0].url : '';
      playlistDiv.appendChild(playlistImage);
  
      playlistContainer.appendChild(playlistDiv);
    });
  };