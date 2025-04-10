document.addEventListener('DOMContentLoaded', function() 
{
  const videosData = [
    {
      id: 1,
      title: "Olha que floresta bonita",
      image: "https://picsum.photos/id/10/320/180",
      views: "300 views",
      time: "1 mês atrás"
    },
    {
      id: 2,
      title: "Vlog dia 1 na floresta",
      image: "https://picsum.photos/id/11/320/180",
      views: "150 views",
      time: "2 semanas atrás"
    },
    {
      id: 3,
      title: "Vlog dia 2 na praia!",
      image: "https://picsum.photos/id/12/320/180",
      views: "1.2k views",
      time: "3 dias atrás"
    },
    {
      id: 4,
      title: "Meus materiais para escola 2025",
      image: "https://picsum.photos/id/20/320/180",
      views: "50 views",
      time: "1 dia atrás"
    },
    {
      id: 5,
      title: "QUANTO CUSTA ESSE SALTO???",
      image: "https://picsum.photos/id/21/320/180",
      views: "80 views",
      time: "1 hora atrás"
    }
  ];

  function renderCards() {
    const container = document.getElementById('cards-container');
    if (container) 
      {
      container.innerHTML = '';

      videosData.forEach(video => 
        {
        const a = document.createElement('a');
        a.href = 'detalhes.html?id=' + video.id;
        a.style.textDecoration = 'none'; 
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${video.image}" alt="${video.title}">
          <h3>${video.title}</h3>
          <p>${video.views} • ${video.time}</p>
        `;
        a.appendChild(card);
        container.appendChild(a);
      });
    }
  }

  function renderDetails()
  {
    const detalhesContainer = document.getElementById('detalhes-container');
    if (detalhesContainer) 
      {
      const params = new URLSearchParams(window.location.search);
      const videoId = params.get('id');
      if (videoId) 
        {
        const video = videosData.find(item => item.id === parseInt(videoId));
        if (video) 
          {
          detalhesContainer.innerHTML = `
            <div class="video-detalhes">
              <img src="${video.image}" alt="${video.title}">
              <h2>${video.title}</h2>
              <p>${video.views} • ${video.time}</p>
              <p>Descrição detalhada do vídeo.</p>
            </div>
          `;
        } 
        else 
        {
          detalhesContainer.innerHTML = `<p>Item não encontrado.</p>`;
        }
      } 
      else 
      {
        detalhesContainer.innerHTML = `<p>Nenhum item foi selecionado.</p>`;
      }
    }
  }

  if (document.getElementById('cards-container'))
     {
    renderCards();
  } else if (document.getElementById('detalhes-container')) 
    {
    renderDetails();
  }

  const btnVoltar = document.getElementById('btn-voltar');
  if (btnVoltar) 
    {
    btnVoltar.addEventListener('click', function() 
    {
      window.location.href = 'index.html';
    });
  }
});
