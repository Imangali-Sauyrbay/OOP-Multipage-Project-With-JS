function showBlock(block) {
  document.body.append(block);

  const animation = block.animate([{
    bottom: '-10%',
    right: '5%',
    opacity: '1'
  },
  {
    bottom: '10%',
    offset: 0.2
  },
  {
    opacity: '1',
    offset: 0.9
  },
  {
    bottom: '10%',
    right: '5%',
    opacity: '0',
  }],
  {
    duration: 2000,
    easing: 'ease-out'
  });

  animation.onfinish = () => {
    document.body.removeChild(block);
  }
}

function createBlock(text, color = 'white', fontColor = 'black', icon = ''){
  const div = document.createElement('div');

  div.style.cssText = `
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: ${color};
  color: ${fontColor};
  z-index: 9999;
  position: fixed;
  pointer-events: none;
  border-radius: 5px;
  `;

  div.insertAdjacentHTML('afterbegin', `<p>${text}</p>${icon}`);

  return div;
}

export {
  createBlock,
  showBlock
}