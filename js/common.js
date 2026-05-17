/* ===== 免费工具站 - 全局通用JS ===== */
(function() {
    // 深色模式切换
    const savedTheme = localStorage.getItem('toolkit-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 添加主题切换按钮
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    btn.title = '切换深色/浅色模式';
    btn.onclick = function() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('toolkit-theme', next);
        btn.innerHTML = next === 'dark' ? '☀️' : '🌙';
    };
    document.body.appendChild(btn);

    // 拖拽上传通用函数
    window.setupDropZone = function(zoneId, callback) {
        const zone = document.getElementById(zoneId);
        if (!zone) return;
        zone.addEventListener('dragover', function(e) {
            e.preventDefault(); this.classList.add('dragover');
        });
        zone.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        zone.addEventListener('drop', function(e) {
            e.preventDefault(); this.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0 && callback) callback(files);
        });
        zone.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = zone.hasAttribute('data-multiple');
            input.accept = zone.getAttribute('data-accept') || '';
            input.onchange = function() {
                if (this.files.length > 0 && callback) callback(this.files);
            };
            input.click();
        });
    };

    // 文件大小格式化
    window.formatSize = function(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
        return (bytes/(1024*1024)).toFixed(1) + ' MB';
    };

    // 下载文件
    window.downloadFile = function(url, filename) {
        const a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
    };

    // 复制文本
    window.copyText = function(text, tipId) {
        navigator.clipboard.writeText(text).then(function() {
            const tip = document.getElementById(tipId);
            if (tip) { tip.style.display = 'inline'; setTimeout(function() { tip.style.display = 'none'; }, 2000); }
        });
    };
})();
