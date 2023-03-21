// popup.js

// 获取按钮实例
let changeColor = document.getElementById('changeColor');

// 从chrome插件的存储里读取color变量并修改按钮颜色
chrome.storage.sync.get('color', ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// 点击按钮
changeColor.addEventListener('click', async() => {
  // 获取当前打开的标签页面
  // 因为需要先准确地获取当前的页面才能注入js，所以这里需要使用同步函数，await
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // 向目标页面里注入js方法
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor
  });
});

// 注入的方法
function setPageBackgroundColor() {
  // 从chrome插件的存储里读取color变量并修改当前页面的body背景色
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
};

