document.addEventListener('DOMContentLoaded', function() 
{
  const btnDetalhes = document.getElementById('btn-detalhes');
  if (btnDetalhes) 
    {
    btnDetalhes.addEventListener('click', function() 
    {
      window.location.href = 'detalhes.html';
    });
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