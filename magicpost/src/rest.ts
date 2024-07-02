import FakeRest from 'fakerest';
import { DataProvider } from 'ra-core';
import generateData from 'data-generator-retail';
/* eslint-disable no-console */
function log(type, resource, params, response) {
    if (console.group) {
        // Better logging in Chrome
        console.groupCollapsed(type, resource, JSON.stringify(params));
        console.log(response);
        console.groupEnd();
    } else {
        console.log('FakeRest request ', type, resource, params);
        console.log('FakeRest response', response);
    }
}

/**
 * Respond to react-admin data queries using a local JavaScript object
 *
 * Useful for debugging and testing - do not use in production.
 *
 * @example
 *
 * import fakeDataProvider from 'ra-data-fakerest';
 * const dataProvider = fakeDataProvider({
 *   posts: [
 *     { id: 0, title: 'Hello, world!' },
 *     { id: 1, title: 'FooBar' },
 *   ],
 *   comments: [
 *     { id: 0, post_id: 0, author: 'John Doe', body: 'Sensational!' },
 *     { id: 1, post_id: 0, author: 'Jane Doe', body: 'I agree' },
 *   ],
 * })
 */
export default (data, loggingEnabled = false): DataProvider => {
    const restServer = new FakeRest.Server();
    restServer.init(data);
    if (typeof window !== 'undefined') {
        // give way to update data in the console
        (window as any).restServer = restServer;
    }
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
    function checkUsername(user) {
        var adminAccount = restServer.getOne("admin", 0);
        if (adminAccount.username === user) {
            return true;
        }
        var managerAccount = restServer.getAll("managerAccounts", {});
        for (let i = 0; i < managerAccount.length; ++i) {
            if (managerAccount[i].username === user) {
                return true;
            }
        }
        var employees = restServer.getAll("employee", {});
        for (let i = 0; i < employees.length; ++i) {
            if (employees[i].username === user) {
                return true;
            }
        }
        return false;
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

    function deletePoint(id) {
        var point = restServer.getOne("points", id);
        var allPoints = restServer.getAll("points", {});
        for (let i = 0; i < allPoints.length; ++i) {
            if (allPoints[i].link_point_reference !== undefined && allPoints[i].link_point_reference === point.reference) {
                return false;
            }
        }
        if (point.manager_id) {
            var manager = restServer.getOne("managerAccounts", point.manager_id);
            manager.point_id = undefined;
            manager.point_reference = ""
            manager.m_type = 0;
            restServer.updateOne("managerAccounts", point.manager_id, {
                ...manager,
            })
        }
        return true;
    }
    function getResponse(type, resource, params) {
        log(type, resource, params, {});
        if (type === 'getPackage') {
            var pac = restServer.getAll("package", {
                filter: {
                    package_id: params.package_id,
                }
            });
            if (pac.length > 0) {
                return {
                    data: {
                        id: 0,
                        pac: pac[0],
                        error: 0,
                    }
                }
            }
            return {
                data: {
                    id: 0,
                    error: 403,
                }
            }

        }
        if (type === 'getHis') {
            var history = restServer.getAll("history", {
                filter: {
                    package_id: params.package_id,
                }
            });
            return {
                data: {
                    id: 0,
                    his: history,
                    error: 0,
                }
            }

        }
        if (type === 'confirm') {
            var delivery = restServer.getOne("delivery", params.delivery_id);
            var packages = delivery.packages;
            for (let i = 0; i < packages.length; ++i) {
                restServer.updateOne("package", packages[i], {
                    current_from: '',
                    from_point_id: '',
                    dest_point_id: '',
                    current_dest: '',
                    status: 'received',
                    current_at: delivery.dest_point_id,
                });
                if (delivery.current_dest === 'receiver') {
                    restServer.updateOne("package", packages[i], {
                        dest_point_id: '',
                        current_at: '',
                    });
                }
                var pac = restServer.getOne("package", packages[i]);
                var his = restServer.getAll("history", {
                    filter: {
                        package_id: pac.package_id,
                    }
                });
                for (let j = 0; j < his.length; ++j) {
                    if (his[j].finished === 0) {
                        restServer.updateOne("history", his[j].id, {
                            finished: 1,
                            end_time: new Date(),

                        });
                        if (delivery.current_dest === 'receiver') {
                            restServer.updateOne("history", his[j].id, {
                                finished: 3,
                                end_time: new Date(),

                            })
                        }
                        break;
                    }
                }
            }
            restServer.updateOne('delivery', params.delivery_id, {
                status: 'resolved',
                is_delivered: 1,
                arrived_date: (new Date()).toLocaleDateString("en-CA"),
            })

            return {
                data: {
                    id: 0,
                    error: 0,
                }
            };
        }
        if (type === 'reject') {
            var delivery = restServer.getOne("delivery", params.delivery_id);
            var packages = delivery.packages;
            for (let i = 0; i < packages.length; ++i) {
                restServer.updateOne("package", packages[i], {
                    status: 'not-received',
                });
                var his = restServer.getAll("history", {
                    filter: {
                        package_id: packages[i].package_id
                    }
                });
                for (let j = 0; j < his.length; ++j) {
                    if (his[j].finished === 0) {
                        restServer.updateOne("history", his[j].id, {
                            finished: 2,
                            end_time: new Date(),

                        })
                        break;
                    }
                }

            }
            restServer.updateOne('delivery', params.delivery_id, {
                status: 'resolved',
                is_delivered: 0,
                arrived_date: (new Date()).toLocaleDateString("en-CA"),
            })

            return {
                data: {
                    id: 0,
                    error: 0,
                }
            };
        }
        if (type === 'getList1') {
            var adminAccount = restServer.getOne("admin", 0);
            if (adminAccount.username === params.username && adminAccount.password === params.password) {
                adminAccount.error = 0;
                adminAccount.link_point_id = "";
                return {
                    data: adminAccount
                }
            }
            var managerAccount = restServer.getAll("managerAccounts", {});
            for (let i = 0; i < managerAccount.length; ++i) {
                if (managerAccount[i].username === params.username && managerAccount[i].password === params.password) {
                    managerAccount[i].error = 0;
                    managerAccount[i].link_point_id = "";
                    return {
                        data: managerAccount[i]
                    }
                }
            }
            var employees = restServer.getAll("employee", {});
            for (let i = 0; i < employees.length; ++i) {
                if (employees[i].username === params.username && employees[i].password === params.password) {
                    employees[i].error = 0;
                    restServer.updateOne("employee", employees[i].id, { last_seen: (new Date()).toLocaleDateString("en-CA") })
                    if (employees[i].role === 'exchanging_employee') {
                        employees[i].link_point_id = restServer.getOne("points", employees[i].point_id).link_point_reference;
                    }
                    return {
                        data: employees[i]
                    }
                }
            }
            return {
                data: {
                    id: 0,
                    error: 403,
                }
            };
        };
        if (type === 'getList2') {
            var adminAccount = restServer.getOne("admin", 0);
            if (adminAccount.username === params.username && adminAccount.password === params.old_password) {
                adminAccount.error = 0;
                restServer.updateOne("admin", 0, { password: params.new_password })
                return {
                    data: adminAccount
                }
            }
            var managerAccount = restServer.getAll("managerAccounts", {});
            for (let i = 0; i < managerAccount.length; ++i) {
                if (managerAccount[i].username === params.username && managerAccount[i].password === params.old_password) {
                    managerAccount[i].error = 0;
                    restServer.updateOne("managerAccounts", managerAccount[i].id, { password: params.new_password })
                    return {
                        data: managerAccount[i]
                    }
                }
            }
            var employees = restServer.getAll("employee", {});
            for (let i = 0; i < employees.length; ++i) {
                if (employees[i].username === params.username && employees[i].password === params.old_password) {
                    employees[i].error = 0;
                    restServer.updateOne("employee", employees[i].id, { password: params.new_password })
                    return {
                        data: employees[i]
                    }
                }
            }
            return {
                data: {
                    id: 0,
                    error: 403,
                }
            };
        }
        if (type === 'getList3') {
            var employees = restServer.getAll("employee", {});
            for (let i = 0; i < employees.length; ++i) {
                if (employees[i].username === params.username) {
                    employees[i].error = 0;
                    restServer.updateOne("employee", employees[i].id, { password: params.new_password })
                    return {
                        data: employees[i]
                    }
                }
            }
            return {
                data: {
                    id: 0,
                    error: 403,
                }
            };
        }
        switch (type) {
            case 'getList': {
                if (localStorage.getItem("role") !== "admin" && resource === 'package' && params.filter.pack_type !== undefined) {
                    if (params.filter.pack_type === 0) {
                        if (params.filter.dest_point_id !== undefined) {
                            delete params.filter.dest_point_id;
                        }
                        params.filter.current_at = localStorage.getItem("point_reference");
                    }
                    else {
                        if (params.filter.current_at !== undefined) {
                            delete params.filter.current_at;
                        }
                        params.filter.dest_point_id = localStorage.getItem("point_reference");
                    }
                    delete params.filter.pack_type;
                }
                if ((localStorage.getItem("role") === "exchanging_employee" || localStorage.getItem("role") === "gathering_employee")
                    && resource === 'delivery' && params.filter.delivery_type !== undefined) {
                    if (params.filter.delivery_type === 0) {
                        if (params.filter.dest_point_id !== undefined) {
                            delete params.filter.dest_point_id;
                        }
                        params.filter.from_point_id = localStorage.getItem("point_reference");
                    }
                    else {
                        if (params.filter.from_point_id !== undefined) {
                            delete params.filter.from_point_id;
                        }
                        params.filter.dest_point_id = localStorage.getItem("point_reference");
                    }
                    delete params.filter.delivery_type;
                }
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: [field, order],
                    range: [(page - 1) * perPage, page * perPage - 1],
                    filter: params.filter,
                };
                return {
                    data: restServer.getAll(resource, query),
                    total: restServer.getCount(resource, {
                        filter: params.filter,
                    }),
                };
            }

            case 'getOne':

                return {
                    data: restServer.getOne(resource, params.id, { ...params }),
                };
            case 'getMany':
                return {
                    data: params.ids.map(
                        id => restServer.getOne(resource, id),
                        { ...params }
                    ),
                };
            case 'getManyReference': {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: [field, order],
                    range: [(page - 1) * perPage, page * perPage - 1],
                    filter: { ...params.filter, [params.target]: params.id },
                };
                return {
                    data: restServer.getAll(resource, query),
                    total: restServer.getCount(resource, {
                        filter: query.filter,
                    }),
                };
            }
            case 'update':

                if (resource === 'points') {
                    var point = restServer.getOne("points", params.id);
                    params.data.manager_id = point.manager_id;
                    params.data.manager_reference = point.manager_reference;
                }

                return {
                    data: restServer.updateOne(resource, params.id, {
                        ...params.data,
                    }),
                };
            case 'updateMany':
                params.ids.forEach(id =>
                    restServer.updateOne(resource, id, {
                        ...params.data,
                    })
                );
                return { data: params.ids };
            case 'create':
                if (resource === 'package') {
                    var count = restServer.getCount(resource, {});
                    params.data.package_id = getpacID(count + 1);
                    var ret = restServer.addOne(resource, { ...params.data });

                    var countHis = restServer.getCount("history", {});
                    var his_data = {};
                    his_data.id = countHis;
                    his_data.package_id = params.data.package_id;
                    his_data.type = 0;
                    his_data.begin_time = new Date();
                    his_data.end_time = new Date();
                    his_data.finished = 1;
                    console.log(his_data);
                    restServer.addOne("history", { ...his_data });
                    return {
                        data: ret,
                    }
                }
                if (resource === 'delivery') {
                    var count = restServer.getCount(resource, {});
                    params.data.delivery_id = getdelID(count + 1);
                    var packages = params.data.packages;

                    if (params.data.current_from.startsWith("Điểm tập kết")) {
                        params.data.current_from = 'gathering';
                    }
                    else {
                        params.data.current_from = 'exchanging';
                    }
                    if (params.data.current_dest !== 'receiver') {
                        if (params.data.current_dest.startsWith("Điểm tập kết")) {
                            params.data.current_dest = 'gathering';
                        }
                        else {
                            params.data.current_dest = 'exchanging';
                        }
                    }
                    if (params.data.current_from === 'exchanging') {
                        if (params.data.current_dest === 'exchanging') {
                            params.data.current_dest = 'gathering';
                        }
                    }
                    if (params.data.from_point_id.startsWith('GD')) {
                        params.data.current_from = 'exchanging';
                    }
                    else {
                        params.data.current_from = 'gathering';
                    }
                    if (params.data.current_dest !== 'receiver') {
                        if (params.data.dest_point_id.startsWith('GD')) {
                            params.data.current_dest = 'exchanging';
                        }
                        else {
                            params.data.current_dest = 'gathering';
                        }
                    }
                    var points = restServer.getAll("points", {});
                    var location_from = "";
                    for (let i = 0; i < points.length; ++i) {
                        if (points[i].reference === params.data.from_point_id) {
                            location_from = points[i].reference + " - " + points[i].location + ", " + points[i].city + ", " + points[i].zipcode;
                        }
                    }
                    var location_to = '';
                    if (params.data.current_dest !== 'receiver') {
                        for (let i = 0; i < points.length; ++i) {
                            if (points[i].reference === params.data.dest_point_id) {
                                location_to = points[i].reference + ": " + points[i].location + ", " + points[i].city + ", " + points[i].zipcode;
                            }
                        }
                    }
                    else {
                        location_to = "người nhận - " + params.data.receive_address;
                    }
                    for (let i = 0; i < packages.length; ++i) {
                        restServer.updateOne("package", packages[i], {
                            current_from: params.data.current_from,
                            from_point_id: params.data.from_point_id,
                            dest_point_id: params.data.dest_point_id,
                            current_dest: params.data.current_dest,
                            delivery_id: params.data.delivery_id,
                            status: 'in-transit',
                        })
                        var countHis = restServer.getCount("history", {});
                        var pac = restServer.getOne("package", packages[i]);
                        var his_data = {};
                        his_data.id = countHis;
                        his_data.package_id = pac.package_id;
                        his_data.type = 1;
                        his_data.begin_time = new Date();
                        his_data.finished = 0;
                        his_data.from = location_from;
                        his_data.to = location_to;
                        restServer.addOne("history", { ...his_data });
                    }


                    
                    

                }
                if (resource === 'points') {
                    var count = restServer.getCount(resource, {})
                    var manager = restServer.getOne("managerAccounts", params.data.manager_id);
                    count += 1;
                    if (count >= 10) {
                        params.data.reference = params.data.p_type === 0 ? "TK00" + count.toString() : "GD00" + count.toString()
                    }
                    else {
                        params.data.reference = params.data.p_type === 0 ? "TK000" + count.toString() : "GD000" + count.toString()
                    }

                    if (params.data.p_type === 0) {
                        manager.m_type = 1;
                        manager.role = 'exchanging_manager';
                        manager.fullName = 'Trưởng điểm giao dịch';
                    }
                    else {
                        manager.m_type = 2;
                        manager.role = 'gathering_manager';
                        manager.fullName = 'Trưởng điểm tập kết';
                    }
                    var new_data = {};
                    new_data.p_type = params.data.p_type.toString();
                    new_data.create_date = (new Date(params.data.create_date)).toLocaleDateString("en-CA");
                    new_data.reference = params.data.reference;
                    new_data.name = params.data.name;
                    new_data.location = params.data.location;
                    new_data.city = params.data.city;
                    new_data.zipcode = params.data.zipcode;
                    new_data.phone = params.data.phone;
                    new_data.manager_reference = params.data.manager_reference;
                    new_data.manager_id = params.data.manager_id;
                    new_data.link_point_id = params.data.link_point_id,
                        new_data.link_point_reference = params.data.link_point_reference;
                    var ret = restServer.addOne(resource, { ...params.data });

                    manager.point_id = ret.id;
                    manager.point_reference = params.data.reference;
                    
                    restServer.updateOne("managerAccounts", params.data.manager_id, {
                        ...manager,
                    })
                    return {
                        data: ret
                    }
                }
                if (resource === 'managerAccounts') {
                    if (checkUsername(params.data.username)) {
                        throw new Error("Tên người dùng đã tồn tại");
                        return;
                    }
                    var count = restServer.getCount(resource, {})
                    count += 1;
                    if (count >= 10) {
                        params.data.reference = "TD00" + count.toString();
                    }
                    else {
                        params.data.reference = "TD000" + count.toString();
                    }
                    params.data.role = 'guest';
                    params.data.fullName = 'Trưởng điểm';
                    params.data.m_type = 0;
                    params.data.point_reference = "";
                    params.data.point_id = null;


                    var ret = restServer.addOne(resource, { ...params.data });
                    return {
                        data: ret
                    }
                }

                if (resource === 'employee') {
                    if (checkUsername(params.data.username)) {
                        throw new Error("Tên người dùng đã tồn tại");
                        return;
                    }
                    var count = restServer.getCount(resource, {})
                    count += 1;
                    params.data.point_id = parseInt(localStorage.getItem("point_id"));
                    if (localStorage.getItem("role") === 'exchanging_manager') {
                        if (count < 10) {
                            params.data.reference = "GDV000" + count.toString();
                        }
                        else if (count < 100) {
                            params.data.reference = "GDV00" + count.toString();
                        }
                        else if (count < 1000) {
                            params.data.reference = "GDV0" + count.toString();
                        }
                        else if (count < 10000) {
                            params.data.reference = "GDV" + count.toString();
                        }
                        params.data.role = 'exchanging_employee';
                        params.data.fullName = 'Nhân viên điểm giao dịch';
                        var point = restServer.getOne("points", parseInt(localStorage.getItem("point_id")));
                        if (point.link_point_reference !== '') {
                            params.data.link_point_id = point.link_point_reference;
                        }
                    }
                    if (localStorage.getItem("role") === 'gathering_manager') {
                        if (count < 10) {
                            params.data.reference = "TKV000" + count.toString();
                        }
                        else if (count < 100) {
                            params.data.reference = "TKV00" + count.toString();
                        }
                        else if (count < 1000) {
                            params.data.reference = "TKV0" + count.toString();
                        }
                        else if (count < 10000) {
                            params.data.reference = "TKV" + count.toString();
                        }
                        params.data.role = 'gathering_employee';
                        params.data.fullName = 'Nhân viên điểm tập kết';
                    }
                    params.data.point_reference = localStorage.getItem("point_reference");
                    params.data.create_date = new Date();

                    var ret = restServer.addOne(resource, { ...params.data });
                    return {
                        data: ret
                    }
                }

                return {
                    data: restServer.addOne(resource, { ...params.data }),
                };
            case 'delete':
                if (resource === 'points') {
                    if (!deletePoint(params.id)) {
                        throw new Error("Không thể xóa điểm tập kết đang liên kết với điểm giao dịch");
                    }
                }
                if (resource === 'managerAccounts') {
                    const manager = restServer.getOne("managerAccounts", params.id);
                    if (manager.point_id !== undefined || manager.point_reference !== '') {
                        throw new Error("Không thể xóa tài khoản trưởng điểm đang quản lý một điểm");
                        return;
                    }
                }
                return { data: restServer.removeOne(resource, params.id) };
            case 'deleteMany':
                params.ids.forEach(id => {
                    if (resource === 'points') {
                        if (!deletePoint(id)) {
                            throw new Error("Không thể xóa điểm tập kết đang liên kết với điểm giao dịch");
                        }
                    }
                    if (resource === 'managerAccounts') {
                        const manager = restServer.getOne("managerAccounts", id);
                        if (manager.point_id !== undefined || manager.point_reference !== '') {
                            throw new Error("Không thể xóa tài khoản trưởng điểm đang quản lý một điểm");
                            return;
                        }
                    }
                    restServer.removeOne(resource, id)
                }
                );
                return { data: params.ids };
            default:
                return false;
        }
    }
    /**
     * @param {String} type One of the data Provider methods, e.g. 'getList'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Promise} The response
     */
    function convertDate(x) {
        if (typeof x === 'string') {
            return (new Date(x)).toLocaleDateString('en-CA');
        }
        else {
            return x.toLocaleDateString('en-CA');
        }
    }
    const handle = async (type, resource, params): Promise<any> => {

        if (params.data !== undefined) {
            if (params.data.create_date !== undefined) {
                params.data.create_date = convertDate(params.data.create_date);
            }
            if (params.data.send_date !== undefined) {
                params.data.send_date = convertDate(params.data.send_date);
            }
            if (params.data.arrived_date !== undefined) {
                params.data.arrived_date = convertDate(params.data.arrived_date);
            }
            if (params.data.begin_date !== undefined) {
                params.data.begin_date = convertDate(params.data.begin_date);
            }
            if (params.data.expected_date !== undefined) {
                params.data.expected_date = convertDate(params.data.expected_date);
            }
            if (params.data.birthday !== undefined) {
                params.data.birthday = convertDate(params.data.birthday);
            }
        }
        if (resource === 'login') {
            type = 'getList1';
        }
        if (resource === 'getHis') {
            type = 'getHis';
        }
        if (resource === 'getPackage') {
            type = 'getPackage';
        }
        if (resource === 'exchangingDelivery' || resource === 'gatheringDelivery') {
            resource = 'delivery';
        }
        if (resource === 'exchangingPackage' || resource === 'gatheringPackage') {
            resource = 'package';
        }
        if (resource === 'change_password') {
            type = 'getList2';
        }
        if (resource === 'change_employee_password') {
            type = 'getList3';
        }
        if (resource === 'confirm') {
            type = 'confirm';
        }
        if (resource === 'reject') {
            type = 'reject';
        }
        if (resource === 'exchangingEmployeeAccounts' || resource === 'gatheringEmployeeAccounts') {
            resource = 'employee';
            if (params.filter === undefined) {
                params.filter = {};
            }
            params.filter.point_reference = localStorage.getItem('point_reference');
        }
        const collection = restServer.getCollection(resource);
        if (!collection && type !== 'create') {
            const error = new UndefinedResourceError(
                `Undefined collection "${resource}"`
            );
            error.code = 1; // make that error detectable
            return Promise.reject(error);
        }
        let response;
        try {
            response = getResponse(type, resource, params);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
        if (loggingEnabled) {
            log(type, resource, params, response);
        }
        if (resource === 'exchangingEmployeeAccounts' || resource === 'gatheringEmployeeAccounts') {
            if (params.filter.point_id) {
                delete params.filter.point_id;
            }
        }
        return Promise.resolve(response);
    };

    return {
        getList: (resource, params) => handle('getList', resource, params),
        getOne: (resource, params) => handle('getOne', resource, params),
        getMany: (resource, params) => handle('getMany', resource, params),
        getManyReference: (resource, params) =>
            handle('getManyReference', resource, params),
        update: (resource, params) => handle('update', resource, params),
        updateMany: (resource, params) =>
            handle('updateMany', resource, params),
        create: (resource, params) => handle('create', resource, params),
        delete: (resource, params) => handle('delete', resource, params),
        deleteMany: (resource, params) =>
            handle('deleteMany', resource, params),
    };
};

class UndefinedResourceError extends Error {
    code: number;
}
