function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randnear() {
    return randomDate(new Date(2020, 0, 1), new Date()).toLocaleDateString("en-CA");
}

function randnear1() {
    return randomDate(new Date(2023, 10, 1), new Date(2023,11, 20)).toLocaleDateString("en-CA");
}

function randnear2() {
    return randomDate(new Date(2023, 10, 1), new Date(2023, 11, 20)).toLocaleDateString("en-CA");
}

function randbirth() {
    return randomDate(new Date(2000, 0, 1), new Date(1980, 0, 1)).toLocaleDateString("en-CA");
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var randName = [
    "Tài Đức",
    "Châu Mẫn",
    "Lệ Dương",
    "Dung Đan",
    "Kiều Đông",
    "Ý Phan",
    "Quang Gia",
    "Phương Minh Dương",
    "Cồ Hoàng Việt",
    "Phi Vĩnh",
    "Phan Gia Hoàng",
    "Dữu Hoàng Long",
    "Nguyễn Việt Thắng",
    "Mạc Bảo Châu",
    "Đặng Tấn Tài",
    "La Ðức Nhân",
    "Hà Viễn Ðông",
    "Cao Huy Tuấn",
    "Kiều Duy Khang",
    "Trầm Quang Hưng",
    "Nguyễn Hoàng Long",
    "Mã Hữu Tài",
    "Giang Khải Tâm",
    "Đỗ Quốc Bảo",
    "An Nam Hải",
    "Hoàng Việt Ngọc",
    "Huỳnh Quang Trường",
    "Mai Phước Nguyên",
    "Bùi Trung Ðức",
    "La Bá Thành",
    "Trần Chiến Thắng",
    "Võ Tín Dư",
    "Vũ Hữu An",
    "Nguyễn Quang Anh",
    "Phạm Vũ Duy",
    "Đỗ Mạnh Dũng",
    "Phí MInh Hiếu",
    "Trần Bảo Quyên",
    "Trần Phương Linh",
    "Nguyễn Hải Đan",
    "Vũ Mạnh Dũng",
    "Vũ Thế Cường",
    "Nguyễn Viết Cường",
    "Trần Hoàng Bách",
    "Trần Chí Bách",
    "Đỗ Thị Châu",
    "Phùng Viết Phú",
    "Đoàn Văn Hậu",
    "Nguyễn Tuấn Anh",
    "Hà Hoàng Hiệp",
    "Lê Thế Duẩn",
    "Nguyễn Tùng Lâm",
    "Lâm Như Tuất",
    "Phan Tài Lộc",
    "Văn Sĩ Hùng",
    "Vũ Minh Phương",
    "Nguyễn Mạnh Hùng",
    "Nguyễn Mạnh Cường",
    "Nguyễn Văn Sỹ",
    "Nguyễn Văn Huân",
    "Đào Quý An",
    "Đào Trọng Tùng",
    "Đỗ Hoàng An",
    "Nguyễn Trọng Tùng",
    "Nguyễn Hoàng An",
    "Đoàn Khánh Hiển",
    "Trần Đức Anh",
    "Trần Đức Chí",
    "Cồ Mạnh Dũng",
    "Cồ Phương Chi",
    "Nguyễn Thị Anh",
    "Nguyễn Hà Anh",
    "Vũ Hà Anh",
    "Vũ Thị Anh",
    "Đỗ Hà Anh",
    "Đỗ Chúc An",
    "Lê Thị Hậu",
    "Lê Thị Anh",
]

var randaddr = [
    "7 Phố Hùng, Xã Từ, Huyện Phan Nhật Hải Phòng",
    "2, Thôn Đồng, Thôn Tú Hoàn, Huyện Lều Trang Diệu Hà Nam",
    "1288 Phố Lỡ, Xã Lã, Quận Du Chiến Bắc Kạn",
    "1659 Phố Khúc, Xã 14, Quận Khuất Hân Hải Phòng",
    "6 Phố Triệu, Ấp Đoàn Chương, Quận Thêu Khánh Hòa",
    "3 Phố Ngân Ẩn Sâm, Thôn Dụng Hoàn, Huyện Trương Vĩnh Long",
    "6433, Thôn Hảo Thiện, Xã Tòng Đan Đan, Huyện Lều Liên Phú Thọ",
    "2 Phố Khổng Bắc Thoại, Phường Ngọc Đinh, Huyện 55 Nam Định",
    "654 Phố Ngô, Ấp Huệ Đan, Huyện Nông Dung Hồ Chí Minh",
    "4 Phố Ngân, Xã 2, Quận 56 Ninh Thuận",
    "3, Thôn Chính Vịnh, Phường Mẫn Đoàn, Quận Hường Bửu Tây Ninh",
    "4478 Phố Thôi Thống Minh, Phường Việt Hạnh, Quận Ngụy Đàn Giang Sóc Trăng",
    "9 Phố Cao Hương Lâm, Xã Tuyết, Huyện Trân Đà Nẵng",
    "6090, Ấp Lý, Phường 5, Quận 63 Phú Yên",
    "9, Thôn 2, Xã 02, Huyện Hoài Mâu Điện Biên",
    "397 Phố Cơ, Xã Mẫn Yến, Quận 9 Kiên Giang",
    "7 Phố Giáp Thống Thơ, Xã 9, Quận Thy Hoàng Bình Thuận",
    "929 Phố Thanh, Xã Lô Thuần Thu, Huyện Khang Thiều Bạc Liêu",
    "61, Ấp Mỹ Ngụy, Ấp Phạm Uy, Huyện 55 Sóc Trăng",
    "7 Phố Thư, Xã Triết, Huyện Vũ Thôi Kiên Giang",
    "Số nhà 19, Ngách 38/3, Tổ dân phố Giang Chính, Phường Biên Giang, Quận Hà Đông, Hà Nội",
    "Số 14, ngõ 189/ 82 Nguyễn Ngọc Vũ, Phường Trung Hoà, Quận Cầu Giấy, Hà Nội",
    " Số nhà 87, Ngõ 182 Đường Phú Diễn, Phường Phú Diễn, Quận Bắc Từ Liêm, Hà Nội",
    "Thôn Tiên Tảo., Xã Việt Long, Huyện Sóc Sơn, Hà Nội",
    " Số 138 Phố Nguyễn Hy Quang, Phường ô Chợ Dừa, Quận Đống đa, Hà Nội",
    "Số 1, phố Thụy Khuê, Phường Thuỵ Khuê, Quận Tây Hồ, Hà Nội",
    "Tầng 3, Số nhà 26, ngõ 82 Nguyễn Phúc Lai, Phường ô Chợ Dừa, Quận Đống đa, Hà Nội",
    " Nhà số 7D Tổ dân phố Xuân Mai, Thị trấn Xuân Mai, Huyện Chương Mỹ, Hà Nội",
    "Số 31 Vũ Phạm Hàm, Phường Yên Hoà, Quận Cầu Giấy, Hà Nội",
    "Số nhà 25 ngõ 75 đường Phú Diễn, Phường Phú Diễn, Quận Bắc Từ Liêm, Hà Nội",
    "Số nhà 95B, Đường Nguyễn Hữu Thọ, Tổ 1, Phường Đại Kim, Quận Hoàng Mai, Hà Nội",
    " Số 47, Ngõ 180/84, phố Nguyễn Lương Bằng, Phường Quang Trung, Quận Đống đa, Hà Nội",
    "Số 12, ngách 7, ngõ 76, đường Xuân Đỉnh., Phường Xuân Đỉnh, Quận Bắc Từ Liêm, Hà Nội",
    "Số nhà 12, ngách 43, ngõ 89 đường Lạc Long Quân, Phường Nghĩa Đô, Quận Cầu Giấy, Hà Nội",
    "21 đường Châu Long, Phường Trúc Bạch, Quận Ba Đình, Hà Nội",
    "Số 20 Phạm Ngũ Lão, Phường Phú Hội, Thành phố Huế, Thừa Thiên - Huế",
    " 33 Nguyễn Lương Bằng, Phường Phú Hội, Thành phố Huế, Thừa Thiên - Huế",
    "Lô A7, Khu quy hoạch 8D, Đường Nguyễn Quang Yên, Phường Phú Bài, Thị xã Hương Thuỷ, Thừa Thiên - Huế",
    "4B/K 126 Tạ Quang Bửu, Phường Thuận Thành, Thành phố Huế, Thừa Thiên - Huế",
    " 26 Hà Huy Giáp, Phường Vỹ Dạ, Thành phố Huế, Thừa Thiên - Huế",
    "08 Hoàng Hoa Thám, Phường Vĩnh Ninh, Thành phố Huế, Thừa Thiên - Huế",
    "118 Lý Thánh Tông, Thị trấn Phú Lộc, Huyện Phú Lộc, Thừa Thiên - Huế",
    "08 Hoàng Hoa Thám, Phường Vĩnh Ninh, Thành phố Huế, Thừa Thiên - Huế",
    "74 Nguyễn Sinh Cung, Phường Vỹ Dạ, Thành phố Huế, Thừa Thiên - Huế",
    "118 Lý Thánh Tông, Thị trấn Phú Lộc, Huyện Phú Lộc, Thừa Thiên - Huế",
    "Đội 13, Thôn Châu Tử, Xã Bình Nguyên, Huyện Bình Sơn, Quảng Ngãi",
    "197/5 Bích Khê, Phường Nghĩa Chánh, Thành phố Quảng Ngãi, Quảng Ngãi",
    "414 Võ Nguyên Giáp, Phường Trương Quang Trọng, Thành phố Quảng Ngãi, Quảng Ngãi",
    "Tổ 8, Phường Chánh Lộ, Thành phố Quảng Ngãi, Quảng Ngãi",
    "số 61, đường Phạm Hồng Thái, Phường Sông Bờ, Thị xã Ayun Pa, Gia Lai",
    "31 Nơ Trang Long, Phường Trà Bá, Thành phố Pleiku, Gia Lai",
    "125/18 Ngô Quyền, Xã Biển Hồ, Thành phố Pleiku, Gia Lai",
    " 326 Nguyễn Viết Xuân, Phường Hội Phú, Thành phố Pleiku, Gia Lai",
    " 22 Nguyễn Trung Trực, Phường Hội Phú, Thành phố Pleiku, Gia Lai",
    "Lô 69 Ngô Mây, Tổ 2, Phường Đoàn Kết, Thị xã Ayun Pa, Gia Lai",
    "40 Hoàng Văn Thụ, Phường Ia Kring, Thành phố Pleiku, Gia Lai",
    " 63 Triệu Quang Phục, Phường Phù Đổng, Thành phố Pleiku, Gia Lai",
    "Số nhà 14, tổ 8A, Phường Đức Xuân, Thành Phố Bắc Kạn, Bắc Kạn",
    "Thôn Tổng Ngay, Xã Dương Phong, Huyện Bạch Thông, Bắc Kạn",

]

var randphone = [
    "+84-61-096-1627",
    "096-905-9979",
    "+84-38-819-4616",
    "(0186) 980 5505",
    "(84)(210)152-1799",
    "+84-8-2116-0894",
    "0711-586-1427",
    "020 044 2252",
    "(054)781-5608",
    "(84)(321)470-0195",
    "+84-62-761-3357",
    "+84-39-370-3243",
    "+84-8-2118-2839",
    "0712-587-9610",
    "+84-32-471-2023",
    "097-906-9980",
    "021 045 2253",
    "(055)782-5609",
    "(84)(322)471-0196",
    "+84-63-097-1628",
    "+84-64-426-5088",
    "+84-31-121-2859",
    "+84-8-2120-4784",
    "0713-588-7801",
    "+84-33-572-1924",
    "098-907-9981",
    "022 046 2254",
    "(056)783-5610",
    "(84)(323)471-0197",
    "+84-65-098-1629",

    "+84-66-762-3358",
    "+84-32-122-2860",
    "+84-8-2122-6729",
    "0714-589-5902",
    "+84-34-673-1825",
    "099-908-9982",
    "023 047 2255",
    "(057)784-5611",
    "(84)(324)471-0198",
    "+84-67-099-1630",

    "+84-68-763-3359",
    "+84-33-123-2861",
    "+84-8-2124-8674",
    "0715-590-3903",
    "+84-35-774-1726",
    "100-909-9983",
    "024 048 2256",
    "(058)785-5612",
    "(84)(325)471-0199",
    "+84-69-100-1631",

    "+84-60-764-3360",
    "+84-34-124-2862",
    "+84-8-2126-0619",
    "0716-591-1904",
    "+84-36-875-1627",
    "091-910-9984",
    "025 049 2257",
    "(059)786-5613",
    "(84)(326)471-0200",
    "+84-70-101-1632",
    "0903 825 226",

]



function getpacID(i) {
    if (i < 10) {
        return "PK0000" + i.toString();
    }
    if (i < 100) {
        return "PK000" + i.toString();
    }
    if (i < 1000) {
        return "PK00" + i.toString();
    }
    if (i < 10000) {
        return "PK0" + i.toString();
    }
    else {
        return "PK" + i.toString();
    }
}

function getdelID(i) {
    if (i < 10) {
        return "DH0000" + i.toString();
    }
    if (i < 100) {
        return "DH000" + i.toString();
    }
    if (i < 1000) {
        return "DH00" + i.toString();
    }
    if (i < 10000) {
        return "DH0" + i.toString();
    }
    if (i < 100000) {
        return "DH" + i.toString();
    }
}
function getphone() {
    return randphone[getRandomInt(0, randphone.length - 1)];
}

function getname() {
    return randName[getRandomInt(0, randName.length - 1)];
}

function getaddr() {
    return randaddr[getRandomInt(0, randaddr.length - 1)];
}

function getPac(min, max) {
    var ret = [];
    for (let i = min; i < max; ++i) {
        ret.push(i);
    }
    return ret;
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function randpackage() {
    var pac = [];
    var alldel = [];
    var count = 0;
    var del_count = 0;
    for (let i = 0; i < 2000; ++i) {
        let from = getRandomInt(1, 5);
        let to = getRandomInt(1, 5);
        while (from === to) {
            to = getRandomInt(1, 5);
        }
        let choice = getRandomInt(0, 10);
        let genmax = getRandomInt(5, 20);
        let randday = randnear1();
        let randdaylarge = randnear();
        for (let j = 0; j < genmax; j++) {
            var obj = {};
            obj.id = count;
            obj.package_id = getpacID(count + 1);
            obj.send_name = getname();
            if (choice >= 5) {
                obj.send_date = randdaylarge;
            }
            else {
                obj.send_date = randday;
            }
            obj.send_phone = getphone();
            obj.send_address = getaddr();
            obj.gdv = getname();
            obj.receive_name = getname();
            obj.receive_phone = getphone();
            obj.receive_address = getaddr();
            obj.main_cost = getRandomInt(0, 10) * 10000;
            obj.other_cost = getRandomInt(0, 3) * 10000;
            obj.gtgt_cost = 0;
            obj.other_service_cost = 0;
            obj.vat = 10;
            obj.receive_other_cost = 0;
            obj.total_cost = ((obj.main_cost + obj.other_cost) * 110 / 100).toFixed(0);
            obj.package_type = getRandomInt(0, 2);
            obj.instruction_type = getRandomInt(0, 5);
            obj.weight = getRandomInt(1, 100);
            obj.special_service = '';
            obj.note = '';
            obj.cod = obj.receive_total_cost = 0;
            obj.items = [

            ];
            obj.send_point_id = 'GD000' + from.toString();
            obj.receive_point_id = 'GD000' + to.toString();
            if (choice === 0) {
                obj.current_at = obj.send_point_id;
                obj.status = 'received';
            }
            else if (choice === 1) {
                obj.current_at = obj.send_point_id;
                obj.current_from = 'exchanging';
                obj.from_point_id = 'GD000' + from.toString();
                obj.dest_point_id = 'TK000' + from.toString();
                obj.current_dest = 'gathering';
                obj.status = 'in-transit';
                obj.delivery_id = getdelID(del_count + 1);
            }
            else if (choice === 2) {
                obj.current_at = 'TK000' + to.toString();
                obj.current_from = 'gathering';
                obj.from_point_id = 'TK000' + from.toString();
                obj.dest_point_id = 'TK000' + to.toString();
                obj.current_dest = 'gathering';
                obj.status = 'in-transit';
                obj.delivery_id = getdelID(del_count + 2);
            }
            else if (choice === 3) {
                obj.current_at = 'TK000' + to.toString();
                obj.current_from = 'gathering';
                obj.from_point_id = 'TK000' + to.toString();
                obj.dest_point_id = 'GD000' + to.toString();
                obj.current_dest = 'exchanging';
                obj.status = 'in-transit';
                obj.delivery_id = getdelID(del_count + 3);
            }
            else if (choice === 4) {
                obj.current_at = 'GD000' + to.toString();
                obj.current_from = 'gathering';
                obj.from_point_id = 'GD000' + to.toString();
                obj.current_dest = 'receiver';
                obj.status = 'in-transit';
                obj.delivery_id = getdelID(del_count + 4);
            }
            else {
                obj.current_at = '';
                obj.current_from = '';
                obj.current_dest = '';
                obj.from_point_id = '';
                obj.dest_point_id = '';
                obj.delivery_id = getdelID(del_count + 4 + j);
            }
            count++;
            pac.push(obj);
        }
        if (choice === 1) {
            var del1 = {};
            del1.id = del_count;
            del1.delivery_id = getdelID(del_count + 1);
            del_count++;
            del1.packages = getPac(count - genmax, count);
            del1.create_date = del1.begin_date = del1.expected_date = (new Date(randday)).addDays(2).toLocaleDateString("en-CA");
            del1.current_from = 'exchanging';
            del1.from_point_id = 'GD000' + from.toString();
            del1.dest_point_id = 'TK000' + from.toString();
            del1.current_dest = 'gathering';
            del1.status = "not-resolved";
            del1.is_delivered = 0;
            alldel.push(del1);
        }
        if (choice === 2) {
            var del1 = {};
            del1.id = del_count;
            del1.delivery_id = getdelID(del_count + 1);
            del_count++;
            del1.packages = getPac(count - genmax, count);
            del1.create_date = del1.begin_date = del1.expected_date = (new Date(randday)).addDays(2).toLocaleDateString("en-CA");
            del1.current_from = 'exchanging';
            del1.from_point_id = 'GD000' + from.toString();
            del1.dest_point_id = 'TK000' + from.toString();
            del1.current_dest = 'gathering';
            del1.status = "resolved";
            del1.arrived_date = (new Date(randday)).addDays(3).toLocaleDateString("en-CA");
            del1.is_delivered = 1;

            var del2 = {};
            del2.id = del_count;
            del2.delivery_id = getdelID(del_count + 1);
            del_count++;
            del2.packages = getPac(count - genmax, count);
            del2.create_date = del2.begin_date = del2.expected_date = (new Date(randday)).addDays(5).toLocaleDateString("en-CA");
            del2.current_from = 'gathering';
            del2.from_point_id = 'TK000' + from.toString();
            del2.dest_point_id = 'TK000' + to.toString();
            del2.current_dest = 'gathering';
            del2.status = "not-resolved";
            del2.is_delivered = 0;

            alldel.push(del1);
            alldel.push(del2);
        }
        if (choice === 3) {
            var del1 = {};
            del1.id = del_count;
            del1.delivery_id = getdelID(del_count + 1);
            del_count++;
            del1.packages = getPac(count - genmax, count);
            del1.create_date = del1.begin_date = del1.expected_date = (new Date(randday)).addDays(2).toLocaleDateString("en-CA");
            del1.current_from = 'exchanging';
            del1.from_point_id = 'GD000' + from.toString();
            del1.dest_point_id = 'TK000' + from.toString();
            del1.current_dest = 'gathering';
            del1.status = "resolved";
            del1.arrived_date = (new Date(randday)).addDays(3).toLocaleDateString("en-CA");
            del1.is_delivered = 1;

            var del2 = {};
            del2.id = del_count;
            del2.delivery_id = getdelID(del_count + 1);
            del_count++;
            del2.packages = getPac(count - genmax, count);
            del2.create_date = del2.begin_date = del2.expected_date = (new Date(randday)).addDays(5).toLocaleDateString("en-CA");
            del2.current_from = 'gathering';
            del2.from_point_id = 'TK000' + from.toString();
            del2.dest_point_id = 'TK000' + to.toString();
            del2.current_dest = 'gathering';
            del2.status = "resolved";
            del2.arrived_date = (new Date(randday)).addDays(6).toLocaleDateString("en-CA");
            del2.is_delivered = 1;

            var del3 = {};
            del3.id = del_count;
            del3.delivery_id = getdelID(del_count + 1);
            del_count++;
            del3.packages = getPac(count - genmax, count);
            del3.create_date = del3.begin_date = del3.expected_date = (new Date(randday)).addDays(7).toLocaleDateString("en-CA");
            del3.current_from = 'gathering';
            del3.from_point_id = 'TK000' + to.toString();
            del3.dest_point_id = 'GD000' + to.toString();
            del3.current_dest = 'exchanging';
            del3.status = "not-resolved";
            del3.is_delivered = 0;

            alldel.push(del1);
            alldel.push(del2);
            alldel.push(del3);
        }
        if (choice == 4) {
            var del1 = {};
            del1.id = del_count;
            del1.delivery_id = getdelID(del_count + 1);
            del_count++;
            del1.packages = getPac(count - genmax, count);
            del1.create_date = del1.begin_date = del1.expected_date = (new Date(randday)).addDays(2).toLocaleDateString("en-CA");
            del1.current_from = 'exchanging';
            del1.from_point_id = 'GD000' + from.toString();
            del1.dest_point_id = 'TK000' + from.toString();
            del1.current_dest = 'gathering';
            del1.status = "resolved";
            del1.arrived_date = (new Date(randday)).addDays(3).toLocaleDateString("en-CA");
            del1.is_delivered = 1;

            var del2 = {};
            del2.id = del_count;
            del2.delivery_id = getdelID(del_count + 1);
            del_count++;
            del2.packages = getPac(count - genmax, count);
            del2.create_date = del2.begin_date = del2.expected_date = (new Date(randday)).addDays(5).toLocaleDateString("en-CA");
            del2.current_from = 'gathering';
            del2.from_point_id = 'TK000' + from.toString();
            del2.dest_point_id = 'TK000' + to.toString();
            del2.current_dest = 'gathering';
            del2.status = "resolved";
            del2.arrived_date = (new Date(randday)).addDays(6).toLocaleDateString("en-CA");
            del2.is_delivered = 1;

            var del3 = {};
            del3.id = del_count;
            del3.delivery_id = getdelID(del_count + 1);
            del_count++;
            del3.packages = getPac(count - genmax, count);
            del3.create_date = del3.begin_date = del3.expected_date = (new Date(randday)).addDays(7).toLocaleDateString("en-CA");
            del3.current_from = 'gathering';
            del3.from_point_id = 'TK000' + to.toString();
            del3.dest_point_id = 'GD000' + to.toString();
            del3.current_dest = 'exchanging';
            del3.status = "resolved";
            del3.arrived_date = (new Date(randday)).addDays(8).toLocaleDateString("en-CA");
            del3.is_delivered = 1;

            alldel.push(del1);
            alldel.push(del2);
            alldel.push(del3);
        }

        if (choice > 4) {
            var del1 = {};
            del1.id = del_count;
            del1.delivery_id = getdelID(del_count + 1);
            del_count++;
            del1.packages = getPac(count - genmax, count);
            del1.create_date = del1.begin_date = del1.expected_date = (new Date(randdaylarge)).addDays(2).toLocaleDateString("en-CA");
            del1.current_from = 'exchanging';
            del1.from_point_id = 'GD000' + from.toString();
            del1.dest_point_id = 'TK000' + from.toString();
            del1.current_dest = 'gathering';
            del1.status = "resolved";
            del1.arrived_date = (new Date(randdaylarge)).addDays(3).toLocaleDateString("en-CA");
            del1.is_delivered = 1;

            var del2 = {};
            del2.id = del_count;
            del2.delivery_id = getdelID(del_count + 1);
            del_count++;
            del2.packages = getPac(count - genmax, count);
            del2.create_date = del2.begin_date = del2.expected_date = (new Date(randdaylarge)).addDays(5).toLocaleDateString("en-CA");
            del2.current_from = 'gathering';
            del2.from_point_id = 'TK000' + from.toString();
            del2.dest_point_id = 'TK000' + to.toString();
            del2.current_dest = 'gathering';
            del2.status = "resolved";
            del2.arrived_date = (new Date(randdaylarge)).addDays(6).toLocaleDateString("en-CA");
            del2.is_delivered = 1;

            var del3 = {};
            del3.id = del_count;
            del3.delivery_id = getdelID(del_count + 1);
            del_count++;
            del3.packages = getPac(count - genmax, count);
            del3.create_date = del3.begin_date = del3.expected_date = (new Date(randdaylarge)).addDays(7).toLocaleDateString("en-CA");
            del3.current_from = 'gathering';
            del3.from_point_id = 'TK000' + to.toString();
            del3.dest_point_id = 'GD000' + to.toString();
            del3.current_dest = 'exchanging';
            del3.status = "resolved";
            del3.arrived_date = (new Date(randdaylarge)).addDays(8).toLocaleDateString("en-CA");
            del3.is_delivered = 1;

            alldel.push(del1);
            alldel.push(del2);
            alldel.push(del3);
        }
        if (choice === 4) {
            for (let x = 0; x < genmax; ++x) {
                var del = {};
                del.id = del_count;
                del.delivery_id = getdelID(del_count + 1);
                del_count++;
                del.packages = [count - genmax + x];
                del.create_date = del.begin_date = del.expected_date = (new Date(randday)).addDays(8).toLocaleDateString("en-CA");
                del.current_from = 'exchanging';
                del.from_point_id = 'GD000' + to.toString();
                del.current_dest = 'receiver';
                del.receive_address = pac[del.packages[0]].receive_address;
                del.receive_name = pac[del.packages[0]].receive_name;
                del.receive_phone = pac[del.packages[0]].receive_phone;
                del.status = "not-resolved";
                alldel.push(del);
            }
        }
        if (choice > 4) {
            for (let x = 0; x < genmax; ++x) {
                var del = {};
                del.id = del_count;
                del.delivery_id = getdelID(del_count + 1);
                del_count++;
                del.packages = [count - genmax + x];
                del.create_date = del.begin_date = del.expected_date = (new Date(randdaylarge)).addDays(8).toLocaleDateString("en-CA");
                del.current_from = 'exchanging';
                del.from_point_id = 'GD000' + to.toString();
                del.current_dest = 'receiver';
                if (getRandomInt(1, 10) < 9) {
                    del.status = "resolved";
                    del.is_delivered = 1;
                }
                else {
                    del.status = "resolved";
                    del.is_delivered = 0;
                }
                del.arrived_date = (new Date(randdaylarge)).addDays(9).toLocaleDateString("en-CA");

                alldel.push(del);
            }
        }
    }
    return [pac, alldel];
}

let a = randpackage();

function getgdvID(i) {
    if (i < 10) {
        return "GDV000" + i.toString();
    }
    if (i < 100) {
        return "GDV00" + i.toString();
    }
    if (i < 1000) {
        return "GDV0" + i.toString();
    }
}

function gettkvID(i) {
    if (i < 10) {
        return "TKV000" + i.toString();
    }
    if (i < 100) {
        return "TKV00" + i.toString();
    }
    if (i < 1000) {
        return "TKV0" + i.toString();
    }
}
function getEmployee() {
    var ems = []
    var gdvcount = 0;
    var tkvcount = 0;
    for (let i = 0; i < 800; ++i) {
        let choice = getRandomInt(1, 10);
        var obj = {};
        obj.id = i;
        obj.create_date = randnear();
        if (choice <= 5) {
            obj.username = "gdv" + (gdvcount + 1).toString();
            obj.role = "exchanging_employee";
            obj.fullName = "Nhân viên điểm giao dịch";
            obj.reference = getgdvID(gdvcount + 1);
            obj.point_reference = "GD000" + choice.toString();
            obj.email = "gdv" + (gdvcount + 1).toString() + "@gmail.com";
            obj.link_point_id = "TK000" + choice.toString();
            ++gdvcount;
        }
        else {
            obj.username = "tkv" + (gdvcount + 1).toString();
            obj.email = "tkv" + (gdvcount + 1).toString() + "@gmail.com";
            obj.role = "gathering_employee";
            obj.fullName = "Nhân viên điểm tập kết";
            obj.reference = getgdvID(tkvcount + 1);
            obj.point_reference = "TK000" + (choice - 5).toString();
            ++tkvcount;
        }
        obj.sex = getRandomInt(0, 1) === 0 ? "male" : "female";
        obj.birthday = randbirth();
        obj.name = getname();
        obj.phone = getphone();
        obj.point_id = choice - 1;
        obj.last_seen = randnear2();
        obj.password = obj.username;
        ems.push(obj);
    }
    return ems;
}

var emsList = getEmployee();
emsList.push({
    id: 800,
    create_date: randnear(),
    username: 'giaodichvien1',
    role: 'exchanging_employee',
    fullName: 'Nhân viên điểm giao dịch',
    reference: 'GDV0020',
    email: "GDV0020@gmail.com",
    link_point_id: "TK0001",
    sex: "male",
    birthday: randbirth(),
    name: getname(),
    phone: getphone(),
    point_id: 0,
    last_seen: randnear2(),
    password: 'giaodichvien1',
    point_reference: 'GD0001', 
})
emsList.push({
    id: 801,
    create_date: randnear(),
    username: 'giaodichvien2',
    role: 'exchanging_employee',
    fullName: 'Nhân viên điểm giao dịch',
    reference: 'GDV0021',
    email: "GDV0021@gmail.com",
    link_point_id: "TK0002",
    sex: "male",
    birthday: randbirth(),
    name: getname(),
    phone: getphone(),
    point_id: 1,
    last_seen: randnear2(),
    password: 'giaodichvien2',
    point_reference: 'GD0002', 
})
emsList.push({
    id: 802,
    create_date: randnear(),
    username: 'giaodichvien3',
    role: 'exchanging_employee',
    fullName: 'Nhân viên điểm giao dịch',
    reference: 'GDV0022',
    email: "GDV0022@gmail.com",
    link_point_id: "TK0003",
    sex: "male",
    birthday: randbirth(),
    name: getname(),
    phone: getphone(),
    point_id: 2,
    last_seen: randnear2(),
    password: 'giaodichvien3',
    point_reference: 'GD0003', 
})
emsList.push({
    id: 803,
    create_date: randnear(),
    username: 'giaodichvien4',
    role: 'exchanging_employee',
    fullName: 'Nhân viên điểm giao dịch',
    reference: 'GDV0023',
    email: "GDV0023@gmail.com",
    link_point_id: "TK0004",
    sex: "male",
    birthday: randbirth(),
    name: getname(),
    phone: getphone(),
    point_id: 3,
    last_seen: randnear2(),
    password: 'giaodichvien4',
    point_reference: 'GD0004', 
})
emsList.push({
    id: 804,
    create_date: randnear(),
    username: 'giaodichvien5',
    role: 'exchanging_employee',
    fullName: 'Nhân viên điểm giao dịch',
    reference: 'GDV0024',
    email: "GDV0024@gmail.com",
    link_point_id: "TK0004",
    sex: "male",
    birthday: randbirth(),
    name: getname(),
    phone: getphone(),
    point_id: 4,
    last_seen: randnear2(),
    password: 'giaodichvien5',
    point_reference: 'GD0005', 
})
emsList.push({
    id: 805,
    create_date: randnear(),
    username: 'tapketvien1',
    role: 'gathering_employee',
    fullName: 'Nhân viên điểm tập kết',
    reference: 'GDV0025',
    email: "GDV0025@gmail.com",
    link_point_id: "",
    sex: "male",
    birthday: randbirth(),
    name: getname(),
    phone: getphone(),
    point_id: 5,
    last_seen: randnear2(),
    password: 'tapketvien1',
    point_reference: 'TK0001', 
})
emsList.push({
    id: 806,
    create_date: randnear(),
    username: 'tapketvien2',
    role: 'gathering_employee',
    fullName: 'Nhân viên điểm tập kết',
    reference: 'GDV0026',
    email: "GDV0026@gmail.com",
    link_point_id: "",
    sex: "male",
    birthday: randbirth(),
    name: getname(),
    phone: getphone(),
    point_id: 6,
    last_seen: randnear2(),
    password: 'tapketvien2',
    point_reference: 'TK0002', 
})
emsList.push({
    id: 807,
    create_date: randnear(),
    username: 'tapketvien3',
    role: 'gathering_employee',
    fullName: 'Nhân viên điểm tập kết',
    reference: 'GDV0027',
    email: "GDV0027@gmail.com",
    link_point_id: "",
    sex: "male",
    birthday: randbirth(),
    name: getname(),
    phone: getphone(),
    point_id: 7,
    last_seen: randnear2(),
    password: 'tapketvien3',
    point_reference: 'TK0003', 
})
emsList.push({
    id: 808,
    create_date: randnear(),
    username: 'tapketvien4',
    role: 'gathering_employee',
    fullName: 'Nhân viên điểm tập kết',
    reference: 'GDV0028',
    email: "GDV0028@gmail.com",
    link_point_id: "",
    sex: "male",
    birthday: randbirth(),
    name: getname(),
    phone: getphone(),
    point_id: 8,
    last_seen: randnear2(),
    password: 'tapketvien4',
    point_reference: 'TK0004', 
})
emsList.push({
    id: 809,
    create_date: randnear(),
    username: 'tapketvien5',
    role: 'gathering_employee',
    fullName: 'Nhân viên điểm tập kết',
    reference: 'GDV0029',
    email: "GDV0029@gmail.com",
    link_point_id: "",
    sex: "male",
    birthday: randbirth(),
    name: getname(),
    phone: getphone(),
    point_id: 9,
    last_seen: randnear2(),
    password: 'tapketvien5',
    point_reference: 'TK0005', 
})
export default {
    reject: [],
    getPackage: [],
    getHis: [],
    change_employee_password: [],
    history: [
        {
            id: 0,
            package_id: "PK00001",
            type: 0,
            begin_time: new Date(),
            end_time: new Date(),
            finished: 1,
        },
        {
            id: 1,
            package_id: "PK00001",
            type: 1,
            begin_time: new Date(),
            end_time: new Date(),
            finished: 1,
            from: "Hà Nội",
            to: "Hồ chí minh",
        },
        {
            id: 2,
            package_id: "PK00001",
            type: 1,
            begin_time: new Date(),
            end_time: new Date(),
            finished: 3,
            from: "Hà Nội",
            to: "Hồ chí minh",
        }
    ],
    package: a[0],
    delivery: a[1],
    employee: emsList,
    confirm: [],
    login: [

    ],
    change_password: [

    ],
    admin: [
        {
            id: 0,
            username: 'admin',
            password: 'admin123',
            role: 'admin',
            fullName: 'Lãnh đạo',
        },
    ],
    points: [
        {
            id: 0,
            p_type: "1",
            create_date: randnear(),
            reference: 'GD0001',
            name: 'Điểm giao dịch Phú hưng',
            location: getaddr(),
            city: 'Hà Nội',
            zipcode: '820000',
            phone: getphone(),
            manager_reference: 'TD0001',
            manager_id: 0,
            link_point_id: 5,
            link_point_reference: 'TK0001',
        },
        {
            id: 1,
            p_type: "1",
            create_date: randnear(),
            reference: 'GD0002',
            name: 'Điểm giao dịch Phú nhuận',
            location: getaddr(),
            city: 'Hà Nội',
            zipcode: '820000',
            phone: getphone(),
            manager_reference: 'TD0002',
            manager_id: 1,
            link_point_id: 6,
            link_point_reference: 'TK0002',
        },
        {
            id: 2,
            p_type: "1",
            create_date: randnear(),
            reference: 'GD0003',
            name: 'Điểm giao dịch Tràng An',
            location: getaddr(),
            city: 'Hà Nội',
            zipcode: '820000',
            phone: getphone(),
            manager_reference: 'TD0003',
            manager_id: 2,
            link_point_id: 7,
            link_point_reference: 'TK0003',
        },
        {
            id: 3,
            p_type: "1",
            create_date: randnear(),
            reference: 'GD0004',
            name: 'Điểm giao dịch Việt Hưng',
            location: getaddr(),
            city: 'Hà Nội',
            zipcode: '820000',
            phone: getphone(),
            manager_reference: 'TD0004',
            manager_id: 3,
            link_point_id: 8,
            link_point_reference: 'TK0004',
        },
        {
            id: 4,
            p_type: "1",
            create_date: randnear(),
            reference: 'GD0005',
            name: 'Điểm giao dịch Phú An',
            location: getaddr(),
            city: 'Hà Nội',
            zipcode: '820000',
            phone: getphone(),
            manager_reference: 'TD0005',
            manager_id: 4,
            link_point_id: 9,
            link_point_reference: 'TK0005',
        },
        {
            id: 5,
            p_type: "0",
            create_date: randnear(),
            reference: 'TK0001',
            name: 'Điểm tập kết Quý Lộc',
            location: getaddr(),
            city: 'Hà Nội',
            zipcode: '820000',
            phone: getphone(),
            manager_reference: 'TD0006',
            manager_id: 5,
            link_point_id: null,
            link_point_reference: '',
        },
        {
            id: 6,
            p_type: "0",
            create_date: randnear(),
            reference: 'TK0002',
            name: 'Điểm tập kết Quý An',
            location: getaddr(),
            city: 'Hà Nội',
            zipcode: '820000',
            phone: getphone(),
            manager_reference: 'TD0007',
            manager_id: 6,
            link_point_id: null,
            link_point_reference: '',
        },
        {
            id: 7,
            p_type: "0",
            create_date: randnear(),
            reference: 'TK0003',
            name: 'Điểm tập kết An Lợi',
            location: getaddr(),
            city: 'Hà Nội',
            zipcode: '820000',
            phone: getphone(),
            manager_reference: 'TD0008',
            manager_id: 7,
            link_point_id: null,
            link_point_reference: '',
        },
        {
            id: 8,
            p_type: "0",
            create_date: randnear(),
            reference: 'TK0004',
            name: 'Điểm tập kết Phú Quý',
            location: getaddr(),
            city: 'Hà Nội',
            zipcode: '820000',
            phone: getphone(),
            manager_reference: 'TD0009',
            manager_id: 8,
            link_point_id: null,
            link_point_reference: '',
        },
        {
            id: 9,
            p_type: "0",
            create_date: randnear(),
            reference: 'TK0005',
            name: 'Điểm tập kết Minh Bạch',
            location: getaddr(),
            city: 'Hà Nội',
            zipcode: '820000',
            phone: getphone(),
            manager_reference: 'TD0010',
            manager_id: 9,
            link_point_id: null,
            link_point_reference: '',
        },
    ],
    managerAccounts: [
        {
            id: 0,
            create_date: randnear(),
            username: 'tdgd1',
            password: 'tdgd1',
            role: 'exchanging_manager',
            fullName: 'Trưởng điểm giao dịch',
            birthday: "1993-12-08",
            name: "Phạm Văn Hùng",
            phone: "099999999",
            point_id: 0,
            reference: "TD0001",
            point_reference: "GD0001",
            sex: "male",
            email: "TD0001@gmail.com",
            m_type: "2",
        },
        {
            id: 1,
            create_date: randnear(),
            username: 'tdgd2',
            password: 'tdgd2',
            role: 'exchanging_manager',
            fullName: 'Trưởng điểm giao dịch',
            birthday: "1993-12-08",
            name: "Phạm Văn Cường",
            phone: "099999999",
            point_id: 1,
            reference: "TD0002",
            point_reference: "GD0002",
            sex: "male",
            email: "TD0002@gmail.com",
            m_type: "2",
        },
        {
            id: 2,
            create_date: randnear(),
            username: 'tdgd3',
            password: 'tdgd3',
            role: 'exchanging_manager',
            fullName: 'Trưởng điểm giao dịch',
            birthday: "1993-12-08",
            name: "Phạm Văn Tuấn",
            phone: "099999999",
            point_id: 2,
            reference: "TD0003",
            point_reference: "GD0003",
            sex: "male",
            email: "TD0003@gmail.com",
            m_type: "2",
        },
        {
            id: 3,
            create_date: randnear(),
            username: 'tdgd4',
            password: 'tdgd4',
            role: 'exchanging_manager',
            fullName: 'Trưởng điểm giao dịch',
            birthday: "1993-12-08",
            name: "Phạm Văn Mạnh",
            phone: "099999999",
            point_id: 3,
            reference: "TD0004",
            point_reference: "GD0004",
            sex: "male",
            email: "TD0004@gmail.com",
            m_type: "2",
        },
        {
            id: 4,
            create_date: randnear(),
            username: 'tdgd5',
            password: 'tdgd5',
            role: 'exchanging_manager',
            fullName: 'Trưởng điểm giao dịch',
            birthday: "1993-12-08",
            name: "Phạm Văn Lưu",
            phone: "099999999",
            point_id: 4,
            reference: "TD0005",
            point_reference: "GD0005",
            sex: "male",
            email: "TD0005@gmail.com",
            m_type: "2",
        },
        {
            id: 5,
            create_date: randnear(),
            username: 'tdtk1',
            password: 'tdtk1',
            role: 'gathering_manager',
            fullName: 'Trưởng điểm tập kết',
            birthday: "1993-12-08",
            name: "Phạm Mạnh Hùng",
            phone: "099999999",
            point_id: 5,
            reference: "TD0006",
            point_reference: "TK0001",
            sex: "male",
            email: "TD0006@gmail.com",
            m_type: "1",
        },
        {
            id: 6,
            create_date: randnear(),
            username: 'tdtk2',
            password: 'tdtk2',
            role: 'gathering_manager',
            fullName: 'Trưởng điểm tập kết',
            birthday: "1993-12-08",
            name: "Phạm Mạnh Tuấn",
            phone: "099999999",
            point_id: 6,
            reference: "TD0007",
            point_reference: "TK0002",
            sex: "male",
            email: "TD0007@gmail.com",
            m_type: "1",
        },
        {
            id: 7,
            create_date: randnear(),
            username: 'tdtk3',
            password: 'tdtk3',
            role: 'gathering_manager',
            fullName: 'Trưởng điểm tập kết',
            birthday: "1993-12-08",
            name: "Phạm Mạnh Minh",
            phone: "099999999",
            point_id: 7,
            reference: "TD0008",
            point_reference: "TK0003",
            sex: "male",
            email: "TD0008@gmail.com",
            m_type: "1",
        },
        {
            id: 8,
            create_date: randnear(),
            username: 'tdtk4',
            password: 'tdtk4',
            role: 'gathering_manager',
            fullName: 'Trưởng điểm tập kết',
            birthday: "1993-12-08",
            name: "Phạm Mạnh Cường",
            phone: "099999999",
            point_id: 8,
            reference: "TD0009",
            point_reference: "TK0004",
            sex: "male",
            email: "TD0009@gmail.com",
            m_type: "1",
        },
        {
            id: 9,
            create_date: randnear(),
            username: 'tdtk5',
            password: 'tdtk5',
            role: 'gathering_manager',
            fullName: 'Trưởng điểm tập kết',
            birthday: "1993-12-08",
            name: "Phạm Tuấn Cường",
            phone: "099999999",
            point_id: 8,
            reference: "TD0010",
            point_reference: "TK0005",
            sex: "male",
            email: "TD00010@gmail.com",
            m_type: "1",
        },
    ],
    exchangingEmployeeAccounts: [

    ],
    gatheringEmployeeAccounts: [

    ],
    exchangingPackage: [

    ],
    exchangingDelivery: [
    ],
    gatheringPackage: [

    ],
    gatheringDelivery: [

    ],
}