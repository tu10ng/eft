// 加载计数数据- 大傻制作 eftarkov.com
// 获取 buttonStatus 对象
const buttonStatusString = localStorage.getItem('buttonStatus');

// 检查 buttonStatus 是否存在且为有效的 JSON 字符串
if (buttonStatusString) {
    try {
        const buttonStatus = JSON.parse(buttonStatusString);
        
        // 定义一个函数来处理键的检查和秘钥的设置
        function setSecretKey(key, secretKeyPrefix, valueIfTrue, valueIfFalse) {
            if (buttonStatus.hasOwnProperty(key)) {
                if (buttonStatus[key] === true) {
                    localStorage.setItem(`${secretKeyPrefix}-${key}`, String(valueIfTrue));
                    // console.log(`秘钥 "${secretKeyPrefix}-${key}" 已设置为 ${valueIfTrue} 并存储到 localStorage 中。`);
                } else {
                    // console.log(`buttonStatus 中 "${key}" 的值不是 true 或 false，未存储秘钥。`);
                }
            } else {
                // console.log(`buttonStatus 中不存在 "${key}" 键，未存储秘钥。`);
            }
        }

        // 处理 "10479" 键-短缺
        setSecretKey('66', '544fb45d4bdc2dee738b4568', 3, 0);
        
        // 处理 "10521" 键-供应商
        setSecretKey('132', '59e7635f86f7742cbf2c1095', 1, 0);
        setSecretKey('132', '5a38e6bac4a2826c6e06d79b', 1, 0);
        
        // 处理 "10482" 键-卫生标准 - 1
        setSecretKey('69', '590a3efd86f77437d351a25b', 1, 0);
        
        // 处理 "10483" 键-卫生标准 - 2
        setSecretKey('70', '590a3efd86f77437d351a25b', 2, 0);
        
        // 处理 "10620" 键-网络供应商 - 1
        setSecretKey('242', '6389c70ca33d8c4cdf4932c6', 4, 0);
        setSecretKey('242', '56742c324bdc2d150f8b456d', 4, 0);
        setSecretKey('242', '590a3efd86f77437d351a25b', 4, 0);
        setSecretKey('242', '5c052f6886f7746b1e3db148', 4, 0);
        
        // 处理 "10484" 键-止痛药
        setSecretKey('71', '544fb3f34bdc2d03748b456a', 4, 0);

        // 处理 "10591" 键-疗养之旅 - 7
        setSecretKey('208', '544fb3f34bdc2d03748b456a', 4, 0);
        setSecretKey('208', '59e35cbb86f7741778269d83', 2, 0);
        setSecretKey('208', '59faf98186f774067b6be103', 2, 0);
        setSecretKey('208', '59fafb5d86f774067a6f2084', 2, 0);

        // 处理 "12190" 键-Rite of Passage
        setSecretKey('440', '5d1b36a186f7742523398433', 2, 0);

        // 处理 "10524" 键-U盘里有什么？
        setSecretKey('135', '590c621186f774138d11ea29', 2, 0);
        
        // 处理 "11376" 键-生意至上
        setSecretKey('432', '590c621186f774138d11ea29', 3, 0);

        // 处理 "10486" 键-汽车修理
        setSecretKey('73', '590a3c0a86f774385a33c450', 8, 0);
        setSecretKey('73', '5733279d245977289b77ec24', 4, 0);
        
        // 处理 "10501" 键-一般储备
        setSecretKey('88', '57347d7224597744596b4e72', 15, 0);

        // 处理 "10428" 键-管制材料
        setSecretKey('34', '5d0379a886f77420407aa271', 5, 0);
        setSecretKey('34', '5d03794386f77420415576f5', 1, 0);
        
        // 处理 "10697" 键-盛装杀戮
        setSecretKey('336', '59e7708286f7742cbd762753', 2, 0);
        setSecretKey('336', '5aa2b9ede5b5b000137b758b', 2, 0);

        // 处理 "10705" 键-临行密密缝 - 1
        setSecretKey('344', '5ab8f20c86f7745cdb629fb2', 1, 0);
        setSecretKey('344', '59e763f286f7742ee57895da', 1, 0);
        
        // 处理 "10706" 键-战争之血 - 2
        setSecretKey('345', '5b43575a86f77424f443fe62', 4, 0);
        
        // 处理 "10714" 键-临行密密缝 - 2
        setSecretKey('348', '5ab8e79e86f7742d8b372e78', 2, 0);

        // 处理 "10714" 键-临行密密缝 - 3
        setSecretKey('353', '545cdb794bdc2d3a198b456a', 2, 0);
        
        // 处理 "10720" 键-酒瘾
        setSecretKey('359', '5d40407c86f774318526545a', 10, 0);
        setSecretKey('359', '5d403f9186f7743cac3f229b', 10, 0);
        setSecretKey('359', '62a09f32621468534a797acb', 20, 0);
        setSecretKey('359', '5d1b33a686f7742523398398', 3, 0);

        // 处理 "11703" 键-Easy Money - Part 2
        setSecretKey('458', '65815f0e647e3d7246384e14', 5, 0);
        setSecretKey('458', '57505f6224597709a92585a9', 2, 0);
        setSecretKey('458', '5d40407c86f774318526545a', 2, 0);
        setSecretKey('458', '62a09f32621468534a797acb', 7, 0);
        
        // 处理 "10716" 键-临行密密缝 - 4
        setSecretKey('355', '59e7643b86f7742cbf2c109a', 2, 0);
        setSecretKey('355', '5648a69d4bdc2ded0b8b457b', 2, 0);

        // 处理 "10715" 键-奢侈无罪 - 1
        setSecretKey('354', '62a09cfe4f842e1bd12da3e4', 1, 0);
        setSecretKey('354', '59faf7ca86f7740dbe19f6c2', 1, 0);
        setSecretKey('354', '573478bc24597738002c6175', 2, 0);
        setSecretKey('354', '59e3658a86f7741776641ac4', 1, 0);
        setSecretKey('354', '59e3639286f7741777737013', 2, 0);
        
        // 处理 "10514" 键-收藏家
        setSecretKey('117', '5bc9b355d4351e6d1509862a', 1, 0);
        setSecretKey('117', '5bc9bdb8d4351e003562b8a1', 1, 0);
        setSecretKey('117', '5bc9b9ecd4351e3bac122519', 1, 0);
        setSecretKey('117', '5bc9b720d4351e450201234b', 1, 0);
        setSecretKey('117', '60b0f93284c20f0feb453da7', 1, 0);
        setSecretKey('117', '5e54f6af86f7742199090bf3', 1, 0);
        setSecretKey('117', '5bc9be8fd4351e00334cae6e', 1, 0);
        setSecretKey('117', '62a09d3bcf4a99369e262447', 1, 0);
        setSecretKey('117', '62a09ec84f842e1bd12da3f2', 1, 0);
        setSecretKey('117', '60b0f6c058e0b0481a09ad11', 1, 0);
        setSecretKey('117', '62a09cfe4f842e1bd12da3e4', 1, 0);
        setSecretKey('117', '60b0f988c4449e4cb624c1da', 1, 0);
        setSecretKey('117', '5fd8d28367cb5e077335170f', 1, 0);
        setSecretKey('117', '5e54f76986f7740366043752', 1, 0);
        setSecretKey('117', '5bd073a586f7747e6f135799', 1, 0);
        setSecretKey('117', '5f745ee30acaeb0d490d8c5b', 1, 0);
        setSecretKey('117', '62a09e974f842e1bd12da3f0', 1, 0);
        setSecretKey('117', '62a09e410b9d3c46de5b6e78', 1, 0);
        setSecretKey('117', '66b37eb4acff495a29492407', 1, 0);
        setSecretKey('117', '66b37ea4c5d72b0277488439', 1, 0);
        setSecretKey('117', '66b37f114410565a8f6789e2', 1, 0);
        setSecretKey('117', '62a091170b9d3c46de5b6cf2', 1, 0);
        setSecretKey('117', '62a09cb7a04c0c5c6e0a84f8', 1, 0);
        setSecretKey('117', '62a09dd4621468534a797ac7', 1, 0);
        setSecretKey('117', '62a09e73af34e73a266d932a', 1, 0);
        setSecretKey('117', '60b0f561c4449e4cb624c1d7', 1, 0);
        setSecretKey('117', '5e54f62086f774219b0f1937', 1, 0);
        setSecretKey('117', '5bc9c049d4351e44f824d360', 1, 0);
        setSecretKey('117', '5bc9c1e2d4351e00367fbcf0', 1, 0);
        setSecretKey('117', '5e54f79686f7744022011103', 1, 0);
        setSecretKey('117', '62a09e08de7ac81993580532', 1, 0);
        setSecretKey('117', '60b0f7057897d47c5b04ab94', 1, 0);
        setSecretKey('117', '62a08f4c4f842e1bd12d9d62', 1, 0);
        setSecretKey('117', '62a09d79de7ac81993580530', 1, 0);
        setSecretKey('117', '69398e94ca94fd2877039504', 1, 0);
        setSecretKey('117', '6937f02dfd6488bb27024839', 1, 0);
        setSecretKey('117', '6937ecf8628ee476240c07cb', 1, 0);
        setSecretKey('117', '6937edb912d456a817083e82', 1, 0);
        setSecretKey('117', '69f9d319c906cd16da03b374', 1, 0);
        setSecretKey('117', '69f9d547b98cc4120608692a', 1, 0);
        setSecretKey('117', '69f9d60b5de6674f08060f2a', 1, 0);

        // 处理 "10708" 键-奢侈无罪 - 2
        setSecretKey('347', '5e54f62086f774219b0f1937', 2, 0);
        setSecretKey('347', '62a091170b9d3c46de5b6cf2', 1, 0);
        setSecretKey('347', '590de71386f774347051a052', 3, 0);
        setSecretKey('347', '590de7e986f7741b096e5f32', 2, 0);
        
        // 处理 "10718" 键-纺织业 - 1
        setSecretKey('357', '5e2af4d286f7746d4159f07a', 5, 0);
        setSecretKey('357', '5e2af4a786f7746d3f3c3400', 10, 0);
        setSecretKey('357', '5c12688486f77426843c7d32', 3, 0);

        // 处理 "10719" 键-纺织业 - 2
        setSecretKey('358', '5e2af41e86f774755a234b67', 10, 0);
        setSecretKey('358', '5e2af47786f7746d404f3aaa', 10, 0);
        setSecretKey('358', '5e2af29386f7746d4159f077', 5, 0);
        
        // 处理 "10726" 键-熟人
        setSecretKey('381', '656df4fec921ad01000481a2', 2, 0);
        setSecretKey('381', '57347da92459774491567cf5', 2, 0);
        setSecretKey('381', '590c5d4b86f774784e1b9c45', 3, 0);

        // 处理 "10745" 键-救护车
        setSecretKey('400', '5c052e6986f7746b207bc3c9', 1, 0);
        setSecretKey('400', '5d02778e86f774203e7dedbe', 2, 0);
        
        // 处理 "10515" 键-抉择
        setSecretKey('118', '59db794186f77448bc595262', 1, 0);

        // 处理 "10754" 键-猎人之路 - 脱销
        setSecretKey('409', '5c0e874186f7745dc7616606', 1, 0);
        
        // 处理 "10757" 键-猎人之路 - 工厂头目
        setSecretKey('412', '60a7acf20c5cb24b01346648', 1, 0);

        // 处理 "10638" 键-挖矿 - 2
        setSecretKey('260', '590a3b0486f7743954552bdb', 2, 0);
        setSecretKey('260', '57347cd0245977445a2d6ff1', 4, 0);
        setSecretKey('260', '59e36c6f86f774176c10a2a7', 2, 0);
        
        // 处理 "10631" 键-信号 - 2
        setSecretKey('253', '573477e124597737dd42e191', 3, 0);
        setSecretKey('253', '590a358486f77429692b2790', 3, 0);
        setSecretKey('253', '590a3b0486f7743954552bdb', 3, 0);
        setSecretKey('253', '56742c324bdc2d150f8b456d', 3, 0);

        // 处理 "10641" 键-挖矿 - 4
        setSecretKey('263', '5734779624597737e04bf329', 15, 0);
        setSecretKey('263', '57347ca924597744596b4e71', 3, 0);
        
        // 处理 "10644" 键-肥料
        setSecretKey('266', '5c06779c86f77426e00dd782', 5, 0);
        setSecretKey('266', '5c06782b86f77426df5407d2', 5, 0);

        // 处理 "10645" 键-进口
        setSecretKey('267', '5c05300686f7746dce784e5d', 1, 0);
        setSecretKey('267', '5c052fb986f7746b2101e909', 1, 0);
        
        // 处理 "10531" 键-维他命 - 2
        setSecretKey('142', '5b4335ba86f7744d2837a264', 3, 0);
        setSecretKey('142', '59e7715586f7742ee5789605', 4, 0);

        // 处理 "10616" 键-特殊装备
        setSecretKey('233', '62a0a16d0b9d3c46de5b6e97', 4, 0);
        setSecretKey('233', '5c05300686f7746dce784e5d', 5, 0);
        setSecretKey('233', '5c05308086f7746b2101e90b', 5, 0);
        setSecretKey('233', '5c052fb986f7746b2101e909', 5, 0);
        setSecretKey('233', '5c052f6886f7746b1e3db148', 5, 0);
        
        // 处理 "11744" 键-Camera, Action!
        setSecretKey('313', '5c06779c86f77426e00dd782', 1, 0);
        setSecretKey('313', '5c06782b86f77426df5407d2', 1, 0);
        setSecretKey('313', '5af0561e86f7745f5f3ad6ac', 1, 0);
        setSecretKey('313', '57347baf24597738002c6178', 1, 0);
        setSecretKey('313', '5d1b392c86f77425243e98fe', 1, 0);
        setSecretKey('313', '573477e124597737dd42e191', 1, 0);
        setSecretKey('313', '590c392f86f77444754deb29', 1, 0);
        setSecretKey('313', '6389c70ca33d8c4cdf4932c6', 1, 0);
        setSecretKey('313', '5909e99886f7740c983b9984', 1, 0);
        setSecretKey('313', '590a358486f77429692b2790', 1, 0);
        setSecretKey('313', '5d1b2ffd86f77425243e8d17', 1, 0);
        setSecretKey('313', '5d1b304286f774253763a528', 1, 0);

        // 处理 "10499" 键-私人诊所
        setSecretKey('86', '5af0534a86f7743b6f354284', 1, 0);
        setSecretKey('86', '5c0530ee86f774697952d952', 1, 0);
        
        // 处理 "10508" 键-急单
        setSecretKey('95', '5c052e6986f7746b207bc3c9', 3, 0);
        setSecretKey('95', '5af0534a86f7743b6f354284', 3, 0);
        setSecretKey('95', '5c0530ee86f774697952d952', 2, 0);
        setSecretKey('95', '5d1b3a5d86f774252167ba22', 20, 0);
        setSecretKey('95', '62a0a043cf4a99369e2624a5', 10, 0);

        // 处理 "11775" 键-Thirsty - Secrets
        setSecretKey('105', '59e3606886f77417674759a5', 3, 0);
        setSecretKey('105', '5c10c8fd86f7743d7d706df3', 2, 0);
        setSecretKey('105', '62a0a043cf4a99369e2624a5', 4, 0);
        
        // 处理 "10504" 键-同事 - 3
        setSecretKey('91', '5ed515f6915ec335206e4152', 1, 0);
        setSecretKey('91', '5ed515c8d380ab312177c0fa', 1, 0);
        setSecretKey('91', '5c94bbff86f7747ee735c08f', 10, 0);

        // 处理 "10606" 键-样品
        setSecretKey('223', '5ed515ece452db0eb56fc028', 1, 0);
        setSecretKey('223', '5ed515f6915ec335206e4152', 1, 0);
        setSecretKey('223', '5ed515c8d380ab312177c0fa', 1, 0);
        setSecretKey('223', '5ed5160a87bb8443d10680b5', 1, 0);
        setSecretKey('223', '5ed51652f6c34d2cc26336a1', 1, 0);
        setSecretKey('223', '5ed5166ad380ab312177c100', 1, 0);
        setSecretKey('223', '5ed515e03a40a50460332579', 1, 0);
        
        // 处理 "10413" 键-惩罚者 - 2
        setSecretKey('19', '572b7fa524597762b747ce82', 7, 0);

        // 处理 "10415" 键-惩罚者 - 4
        setSecretKey('21', '57e26fc7245977162a14b800', 5, 0);
        
        // 处理 "10608" 键-租借法案 - 2
        setSecretKey('225', '5c05308086f7746b2101e90b', 2, 0);
        setSecretKey('225', '5c052f6886f7746b1e3db148', 1, 0);

        // 处理 "10625" 键-灯塔之匙
        setSecretKey('247', '59e366c186f7741778269d85', 2, 0);
        setSecretKey('247', '5734795124597738002c6176', 1, 0);
        setSecretKey('247', '5d0376a486f7747d8050965c', 2, 0);
        setSecretKey('247', '5d1b304286f774253763a528', 1, 0);
        setSecretKey('247', '5c052f6886f7746b1e3db148', 1, 0);
        setSecretKey('247', '62e910aaf957f2915e0a5e36', 1, 0);
        
        // 处理 "10550" 键-夜间扫荡
        setSecretKey('160', '5fc64ea372b0dd78d51159dc', 12, 0);
 
        // 处理 "10587" 键-疗养之旅 - 3
        setSecretKey('204', '590c5bbd86f774785762df04', 1, 0);
        setSecretKey('204', '59e35cbb86f7741778269d83', 2, 0);
        setSecretKey('204', '59e3556c86f7741776641ac2', 2, 0);
        setSecretKey('204', '59e358a886f7741776641ac3', 2, 0);

        // 处理 "11772" 键-Thirsty - Breadwinner
        setSecretKey('172', '59fafb5d86f774067a6f2084', 2, 0);
        
        // 处理 "10639" 键-不良嗜好
        setSecretKey('261', '5734770f24597738025ee254', 5, 0);
        setSecretKey('261', '573476d324597737da2adc13', 5, 0);
        setSecretKey('261', '573476f124597737e04bf328', 5, 0);

        // 处理 "10729" 键-美味香肠
        setSecretKey('384', '635a758bfefc88a93f021b8a', 1, 0);
        
        // 处理 "10624" 键-试探 - 3
        setSecretKey('246', '5fca13ca637ee0341a484f46', 1, 0);
        setSecretKey('246', '5c0e531d86f7747fa23f4d42', 5, 0);
        setSecretKey('246', '5c0e531286f7747fa54205c2', 15, 0);
	
        // 处理 "11750" 键-Small Business - Part 1
        setSecretKey('128', '66572b8d80b1cd4b6a67847f', 1, 0);
        setSecretKey('128', '66572c82ad599021091c6118', 1, 0);
        setSecretKey('128', '66572cbdad599021091c611a', 1, 0);
        setSecretKey('128', '66572be36a723f7f005a066e', 1, 0);
        setSecretKey('128', '655c673673a43e23e857aebd', 1, 0);
        setSecretKey('128', '655c67782a1356436041c9c5', 1, 0);
        setSecretKey('128', '655c669103999d3c810c025b', 1, 0);
        setSecretKey('128', '655c67ab0d37ca5135388f4b', 1, 0);
        setSecretKey('128', '655c66e40b2de553b618d4b8', 1, 0);

        // 处理 "10404" 键-蛋卷冰淇淋
        setSecretKey('10', '55d482194bdc2d1d4e8b456b', 3, 0);
        
        // 处理 "10755" 键-猎人之路 - 森林管理员
        setSecretKey('410', '5d08d21286f774736e7c94c3', 1, 0);

        // 处理 "10751" 键-鱼塘
        setSecretKey('406', '5c94bbff86f7747ee735c08f', 2, 0);
        
        // 处理 "10752" 键-猎人之路 - 物资
        setSecretKey('407', '5b3b713c5acfc4330140bd8d', 1, 0);	
        
        // 处理 "11753" 键-Special Offer
        setSecretKey('369', '5e997f0b86f7741ac73993e2', 1, 0);
        setSecretKey('369', '628bc7fb408e2b2e9c0801b1', 1, 0);
        setSecretKey('369', '609e860ebd219504d8507525', 1, 0);
        setSecretKey('369', '628baf0b967de16aab5a4f36', 1, 0);
        setSecretKey('369', '628b9c7d45122232a872358f', 1, 0);
	
        // 处理 "10416" 键-惩罚者 - 5
        setSecretKey('22', '5644bd2b4bdc2d3b4c8b4572', 1, 0);
        setSecretKey('22', '5447a9cd4bdc2dbd208b4567', 1, 0);
        setSecretKey('22', '5448bd6b4bdc2dfc2f8b4569', 2, 0);
        
        // 处理 "12420" 键-有利可图的生意
        setSecretKey('188', '5a1eaa87fcdbcb001865f75e', 15, 0);
        
        // 处理 "12421" 键-安全保障
        setSecretKey('189', '5c0e625a86f7742d77340f62', 15, 0);
        setSecretKey('189', '5ca20ee186f774799474abc2', 12, 0);
        setSecretKey('189', '5c0e842486f77443a74d2976', 3, 0);
        
        // 处理 "12422" 键-学无止境
        setSecretKey('190', '5bb2475ed4351e00853264e3', 15, 0);
        setSecretKey('190', '60194943740c5d77f6705eea', 4500, 0);
        setSecretKey('190', '601948682627df266209af05', 8, 0);
        
        // 处理 "12423" 键-站稳脚跟
        setSecretKey('191', '5c0e531d86f7747fa23f4d42', 30, 0);
        setSecretKey('191', '637b60c3b7afa97bfc3d7001', 30, 0);
        setSecretKey('191', '5c0e530286f7747fa1419862', 30, 0);
        setSecretKey('191', '5ed51652f6c34d2cc26336a1', 30, 0);
        setSecretKey('191', '5c0e534186f7747fa1419867', 30, 0);
        setSecretKey('191', '5fca13ca637ee0341a484f46', 30, 0);
        setSecretKey('191', '637b612fb7afa97bfc3d7005', 30, 0);
        setSecretKey('191', '5ed5160a87bb8443d10680b5', 30, 0);
        
        // 处理 "12424" 键-利润保留
        setSecretKey('192', '57347ca924597744596b4e71', 30, 0);
        setSecretKey('192', '59faff1d86f7746c51718c9c', 15, 0);
        
        // 处理 "12425" 键-人生之课
        setSecretKey('193', '5d40407c86f774318526545a', 8, 0);
        setSecretKey('193', '5d403f9186f7743cac3f229b', 15, 0);
        setSecretKey('193', '5d1b376e86f774252519444e', 15, 0);
        
        // 处理 "10582" 键-人道主义援助
        setSecretKey('199', '590c5f0d86f77413997acfab', 5, 0);
        
        // 处理 "10698" 键-感恩的心
        setSecretKey('337', '5aa2b923e5b5b000137b7589', 1, 0);
        setSecretKey('337', '5aa2b9aee5b5b00015693121', 1, 0);
        setSecretKey('337', '5ab8f4ff86f77431c60d91ba', 1, 0);
        setSecretKey('337', '5ab8f85d86f7745cd93a1cf5', 1, 0);
        
        // 处理 "10781" 键-归还人情
        setSecretKey('447', '6389c8c5dbfd5e4b95197e6b', 2, 0);
        
        // 处理 "10430" 键-无意冒犯
        setSecretKey('36', '58d3db5386f77426186285a0', 10, 0);
        
        // 处理 "369" 键-特殊提议
        setSecretKey('369', '5e997f0b86f7741ac73993e2', 1, 0);
        setSecretKey('369', '628bc7fb408e2b2e9c0801b1', 1, 0);
        setSecretKey('369', '609e860ebd219504d8507525', 1, 0);
        setSecretKey('369', '628baf0b967de16aab5a4f36', 1, 0);
        setSecretKey('369', '628b9c7d45122232a872358f', 1, 0);
        
        // 处理 "4907" 键-不容置问
        setSecretKey('4907', '5c0126f40db834002a125382', 2, 0);
	
    } catch (error) {
        // 处理 JSON 解析错误
        console.error('解析 buttonStatus 时出错:', error);
    }
} else {
    // 如果 buttonStatus 不存在，可以选择执行其他操作或忽略
    // console.log('buttonStatus 不存在于 localStorage 中，未存储秘钥。');
}