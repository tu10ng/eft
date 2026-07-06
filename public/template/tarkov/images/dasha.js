    var randomNum = function(minNum, maxNum) {
        switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
        }
        ;
    };
    var duoMaomao = function() {
        var maomao = $('#maomao');
        maomao.css('bottom', randomNum(25, 80) + 'vh');
    };



document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('modeButton');
    const modeTip = document.getElementById('modeTip'); // 获取提示框元素
    const currentMode = localStorage.getItem('currentMode');

    // 初始化模式按钮文本
    if (currentMode) {
        button.textContent = currentMode === 'pve' ? 'PVE' : 'PVP';
    } else {
        button.textContent = 'PVP';
        localStorage.setItem('currentMode', 'regular');
    }

    // 按钮点击事件
    button.addEventListener('click', () => {
        const currentText = button.textContent;
        let newMode, newText, tipText;

        // 确定新模式、新文本和提示内容
        if (currentText === 'PVP') {
            newText = 'PVE';
            newMode = 'pve';
            tipText = '已切换到PVE模式';
        } else {
            newText = 'PVP';
            newMode = 'regular';
            tipText = '已切换到PVP模式';
        }

        // 更新按钮文本和本地存储
        button.textContent = newText;
        localStorage.setItem('currentMode', newMode);

        // 显示提示框
        modeTip.textContent = tipText;
        modeTip.style.opacity = '1'; // 显示提示

        // 3秒后隐藏提示框，然后刷新页面
        setTimeout(() => {
            modeTip.style.opacity = '0'; // 隐藏提示
            // 等待过渡动画完成后再刷新（避免动画被打断）
            setTimeout(() => {
                window.location.reload();
            }, 300);
        }, 1500); // 提示显示1.5秒，可根据需求调整
    });
});