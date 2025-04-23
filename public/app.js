document.addEventListener('DOMContentLoaded', () => 
  {
  const currentPath = window.location.pathname;
  

  if (currentPath.includes('index.html') || currentPath.endsWith('/'))
     {
    renderCarousel();
    renderAllItems();
  } 

  else if (currentPath.includes('detalhes.html')) 
    {
    renderDetalhes();
    renderVideosRelacionados();
  }


  const btnVoltar = document.getElementById('btn-voltar');
  if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }


  function renderCarousel() 
  {
    const destaques = dadosVideos.videos.filter(item => item.destaque);
    const carouselInner = document.getElementById('carousel-inner-destaques');
    const carouselIndicators = document.getElementById('carousel-indicators');
    
    if (!carouselInner || !carouselIndicators) return;

    let primeiro = true;
    destaques.forEach((item, index) => 
      {
      // Criar indicadores
      const indicator = document.createElement('button');
      indicator.type = 'button';
      indicator.setAttribute('data-bs-target', '#carouselPopular');
      indicator.setAttribute('data-bs-slide-to', index.toString());
      if (primeiro) 
        {
        indicator.classList.add('active');
      }
      indicator.setAttribute('aria-label', `Slide ${index + 1}`);
      carouselIndicators.appendChild(indicator);

      const carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item' + (primeiro ? ' active' : '');
      primeiro = false;
      carouselItem.innerHTML = `
        <img src="${item.imagem_principal}" class="d-block w-100" alt="${item.titulo}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${item.titulo}</h5>
          <p>${item.descricao}</p>
          <a href="detalhes.html?id=${item.id}" class="btn btn-success btn-sm">Ver detalhes</a>
        </div>
      `;
      carouselInner.appendChild(carouselItem);
    });
  }

  function renderAllItems() 
  {
    const container = document.getElementById('cards-container');
    if (!container) return;

    dadosVideos.videos.forEach(item => 
      {
      const col = document.createElement('div');
      col.className = 'col-sm-6 col-md-4 col-lg-3';
      col.innerHTML = `
        <div class="card h-100">
          <img src="${item.imagem_principal}" class="card-img-top" alt="${item.titulo}">
          <div class="card-body">
            <h5 class="card-title">${item.titulo}</h5>
            <p class="card-text">${item.descricao}</p>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-success">${item.categoria}</span>
              <small class="text-muted">${item.duracao}</small>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <small class="text-muted">Por: ${item.autor}</small>
            <a href="detalhes.html?id=${item.id}" class="btn btn-outline-success btn-sm">Ver detalhes</a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  }

  function renderDetalhes() 
  {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('id');
    const item = dadosVideos.videos.find(v => v.id == itemId);
    
    if (!item) 
      {
      window.location.href = 'index.html';
      return;
    }

    document.title = `FakeTube - ${item.titulo}`;

    const detalhesContainer = document.getElementById('detalhes-container');
    if (detalhesContainer) 
      {
      detalhesContainer.innerHTML = `
        <img src="${item.imagem_principal}" class="img-fluid rounded mb-3" alt="${item.titulo}">
        <h2>${item.titulo}</h2>
        
        <div class="video-stats mb-3">
          <div class="stat-item">
            <i class="bi bi-eye"></i> ${item.visualizacoes} visualizações
          </div>
          <div class="stat-item">
            <i class="bi bi-calendar3"></i> ${formatarData(item.data)}
          </div>
          <div class="stat-item">
            <i class="bi bi-clock"></i> ${item.duracao}
          </div>
        </div>
        
        <div class="video-info mb-3">
          <i class="bi bi-person-circle"></i> <strong>${item.autor}</strong>
        </div>
        
        <div class="video-info mb-3">
          <i class="bi bi-tag"></i> <span class="badge bg-success">${item.categoria}</span>
        </div>
        
        <div class="mt-4">
          <h4>Descrição</h4>
          <p>${item.conteudo}</p>
        </div>
      `;
    }

    const infoAdicional = document.getElementById('info-adicional');
    if (infoAdicional) 
      {
      infoAdicional.innerHTML = `
        <div class="card-body">
          <h4 class="card-title text-success">Informações Adicionais</h4>
          
          <div class="mb-3">
            <h5 class="fs-6">Avaliações</h5>
            <div class="d-flex mb-2">
              <div class="me-2">
                <i class="bi bi-hand-thumbs-up-fill text-success"></i> 1.2k
              </div>
              <div>
                <i class="bi bi-hand-thumbs-down"></i> 45
              </div>
            </div>
          </div>
          
          <div class="mb-3">
            <h5 class="fs-6">Compartilhar</h5>
            <div class="d-flex gap-2 fs-5">
              <a href="#" class="text-primary"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-info"><i class="bi bi-twitter"></i></a>
              <a href="#" class="text-danger"><i class="bi bi-youtube"></i></a>
              <a href="#" class="text-success"><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>
          
          <div>
            <h5 class="fs-6">Tags</h5>
            <div>
              <span class="badge bg-secondary me-1">#${item.categoria.toLowerCase()}</span>
              <span class="badge bg-secondary me-1">#faketube</span>
              <span class="badge bg-secondary me-1">#trending</span>
            </div>
          </div>
        </div>
      `;
    }

    const fotosContainer = document.getElementById('fotos-container');
    if (fotosContainer && item.imagens_complementares.length > 0) 
      {
      item.imagens_complementares.forEach(img => 
        {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-md-4';
        col.innerHTML = `
          <div class="gallery-item">
            <img src="${img.src}" class="img-fluid rounded" alt="${img.descricao}">
            <div class="gallery-caption">${img.descricao}</div>
          </div>
        `;
        fotosContainer.appendChild(col);
      });
    }
  }

  function renderVideosRelacionados() 
  {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('id');
    const currentItem = dadosVideos.videos.find(v => v.id == itemId);
    
    if (!currentItem) return;
    
    const relacionados = dadosVideos.videos
      .filter(v => v.categoria === currentItem.categoria && v.id != itemId)
      .slice(0, 3); 
    
    const container = document.getElementById('videos-relacionados');
    if (!container) return;
    
    if (relacionados.length === 0) 
      {
      container.innerHTML = '<p>Não há vídeos relacionados disponíveis.</p>';
      return;
    }
    
    relacionados.forEach(item => 
      {
      const col = document.createElement('div');
      col.className = 'col-sm-6 col-md-4';
      col.innerHTML = `
        <div class="card h-100">
          <img src="${item.imagem_principal}" class="card-img-top" alt="${item.titulo}">
          <div class="card-body">
            <h5 class="card-title">${item.titulo}</h5>
            <p class="card-text">${truncateText(item.descricao, 60)}</p>
          </div>
          <div class="card-footer">
            <a href="detalhes.html?id=${item.id}" class="btn btn-outline-success btn-sm w-100">Ver vídeo</a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  }

  function formatarData(dataString) 
  {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', 
      {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  function truncateText(text, maxLength) 
  {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
});
