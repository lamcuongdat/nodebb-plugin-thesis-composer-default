# Plugin cho composer của NodeBB (Luận văn CNTN 2016 - HCMUS)

Plugin được viết dựa trên source code gốc của [nodebb-plugin-composer-default](https://github.com/NodeBB/nodebb-plugin-composer-default)

## Cài đặt

1. Mở command line ở thư mục chứa source code của compser này và chạy lệnh `npm link`
2. Mở command line ở thư mục chứa source code của NodeBB và chạy lệnh `npm link nodebb-plugin-thesis-composer-default`
3. Vào trang admin của NodeBB */admin/extend/plugins*:
* Tìm và deactivate plugin *nodebb-plugin-composer-default*
* Tìm và activate plugin *nodebb-plugin-thesis-composer-default*
4. Rebuild và restart NodeBB

## Ảnh chụp màn hình

### Composer trên desktop

#### Composer mặc định

![Desktop Old Composer](screenshots/desktop-old.png?raw=true)

##### Composer đã chỉnh sửa

![Desktop New Composer 1](screenshots/desktop-new1.png?raw=true)
![Desktop New Composer 2](screenshots/desktop-new2.png?raw=true)

### Composer trên Mobile Devices

![Mobile Composer](screenshots/mobile.png?raw=true)
