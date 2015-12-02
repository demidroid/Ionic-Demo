angular.module('ionicApp', ['ionic'])
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('tabs', {
                    url: "/tab",
                    abstract: true,
                    templateUrl: "tab-home.html"
                })
                .state('tabs.home', {
                    url: "/home",
                    views: {
                        'home-tab': {
                            templateUrl: "homehtml.html",
                            controller: 'HomeTabCtrl'
                        }
                    }
                })
                .state('tabs.productList', {
                    url: "/productList",
                    views: {
                        'productList-tab': {
                            templateUrl: "productList.html"
                        }
                    }
                })
                .state('tabs.buycarPage', {
                    url: "/buycarPage",
                    views: {
                           'buycarPage-tab': {
                            templateUrl: "buycarPage.html"
                        }
                    }
                })

                .state('tabs.mytaobao', {
                    url: "/mytaobao",
                    views: {
                            'mytaobao-tab': {
                            templateUrl: "myTaobao.html"
                        }
                    }
                })
                .state('tabs.more', {
                    url: "/more",
                    views: {
                        'more-tab': {
                            templateUrl: "morePage.html"
                        }
                    }
                })
                .state('tabs.productdetail',{
                    url:"/productdetail:name:imageUrl:price",
                    views:{
                        'productList-tab':
                        {
                           templateUrl:"productdetail.html"
                        }
                    }

                })
                .state('tabs.sizeAndColorStyle',{
                    url:"/sizeAndColorStyle",
                    views:{
                        'productList-tab':
                        {
                            templateUrl:"sizeAndColorStyle.html"
                        }
                    }

                })



        $urlRouterProvider.otherwise("/tab/home");

        })
    .directive('hideTabs', function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                scope.$on('$ionicView.beforeEnter', function() {

                    scope.$watch(attributes.hideTabs, function(value){
                        //debugger
                        $rootScope.hideTabs = value;
                    });
                });

                scope.$on('$ionicView.beforeLeave', function(value) {
                    //debugger
                    $rootScope.hideTabs = value;
                });
            }
        };
    })

        .controller('HomeTabCtrl', function($scope) {
            console.log('HomeTabCtrl');
        })
        .controller('SlideController', function($scope) {

            $scope.myActiveSlide = 1;

        })
    .factory('product', function () {
        return {
            name:'',
            imageUrl:'',
            price:'',
            setName:function(name)
            {
                this.name = name;
            },
            setImageUrl:function(imageUrl)
            {
                this.imageUrl=imageUrl;
            },
            setPrice:function(price)
            {
              this.price  = price;
            }
        }
    })
        .controller('productCtrl',['$scope','$timeout','$http','$location','$state',function($scope,$timeout,$http,$location,$state){
             $scope.items=[
                 {"imageUrl":"https://img.alicdn.com/bao/uploaded/i3/TB1pSvpJpXXXXcoXXXXXXXXXXXX_!!0-item_pic.jpg_480x480q50.jpg",
                     "name":"冬季加厚男士秋季青少年长袖T恤上衣服打底衫",
                     "price":"$46.00",
                     "detail" :"免运费    8889人付款   苏州"
                 },
                 {"imageUrl":"https://img.alicdn.com/bao/uploaded/i3/TB1pSvpJpXXXXcoXXXXXXXXXXXX_!!0-item_pic.jpg_480x480q50.jpg",
                     "name":"冬季加厚男士秋季青少年长袖T恤上衣服打底衫",
                     "price":"$46.00",
                     "detail" :"免运费    8889人付款   苏州"
                 },
                 {"imageUrl":"https://img.alicdn.com/bao/uploaded/i3/TB1pSvpJpXXXXcoXXXXXXXXXXXX_!!0-item_pic.jpg_480x480q50.jpg",
                     "name":"冬季加厚男士秋季青少年长袖T恤上衣服打底衫",
                     "price":"$46.00",
                     "detail" :"免运费    8889人付款   苏州"
                 }
             ];
        $scope.items.push({"imageUrl":"https://img.alicdn.com/bao/uploaded/i3/TB1pSvpJpXXXXcoXXXXXXXXXXXX_!!0-item_pic.jpg_480x480q50.jpg",
            "name":"冬季加厚男士秋季青少年长袖T恤上衣服打底衫",
            "price":"$46.00",
            "detail" :"免运费    8889人付款   苏州"
        });

        $scope.items = [];
        $scope.loadMore = function () {

            $http.get('http://www.runoob.com/try/demo_source/item.json')
                .success(function(newItems){

                })
                .finally(function(){
                    $scope.items.push({"imageUrl":"https://img.alicdn.com/bao/uploaded/i3/TB1pSvpJpXXXXcoXXXXXXXXXXXX_!!0-item_pic.jpg_480x480q50.jpg",
                        "name":"冬季加厚男士秋季青少年长袖T恤上衣服打底衫",
                        "price":"$46.00",
                        "detail" :"免运费    8889人付款   苏州"
                    });
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        };
        $scope.$on('stateChangeSuccess', function() {
            $scope.loadMore();
        });

       $scope.toDetail = function(name,imageUrl,price)
       {

           $state.go('tabs.productdetail',{name:name,imageUrl:imageUrl,price:price});

       }
        //$scope.goOther = function () {
        //    $state.go('tab.home');
        //    $location.url('/')
        //    location.href='/index.html#/index/app';
        //}
           $scope.doRefresh = function()
           {
             $http.get('http://www.runoob.com/try/demo_source/item.json')
                 .success(function(newItems){
                    $scope.items = newItems;
                 })
                 .finally(function(){
                    $scope.$broadcast('scroll.refreshComplete') ;
                 });
           };
        }])

    
    .controller('productdetailCtrl',function($scope,$state,$stateParams,$http,product) {
        $scope.name = $stateParams.name;
        $scope.imageUrl = $stateParams.imageUrl;
        $scope.price = $stateParams.price;
        $scope.clickPage = function (index) {

            $scope.myActiveSlide = index;
        };
        $http.get('http://kangsitanding.baijia.baidu.com/article/247233')
            .success(function (resp) {

                $scope.imageDetail = 'hello';
            })
        .finally(function(){
            $scope.imageDetail = "剪标产品，无商标吊牌，介意的MM慎拍所售价格均为工厂价,诚信经营, 我们的宗旨是要让每一个消费者都买到称心如意的产品,都成为我们的回头客.保证每一件商品都是正品, 无瑕疵面料采用了80S丝光棉平纹布,这种面料只有高档衬衣才会用的,市面上的衬衣一般都是30S-50S的.他不仅具有棉的吸汗,透气,柔软舒适的特点,还有丝绸般的光泽,色牢度高,久洗不褪色,不缩水,不变形,悬垂抗皱性能好.真金不怕火炼, 支持专柜验货和7天无理由退换.货号:VSCSG30300原价:1380元成分:100%棉友情提醒:最近网上有商家盗取我们的图片和文案,请亲一定谨慎购买,不买最便宜的,也不买最贵的,只买最实惠的.亲可以买回去比较的,说的再好都没有用,关键看实物,实物就是证明.";
        });
        $scope.items = [];
        $scope.items.push({"name":"货号","value":"30300"});
        $scope.items.push({"name":"服装版型","value":"修身"});
        $scope.items.push({"name":"风格","value":"通勤"});
        $scope.items.push({"name":"衣长","value":"常规款"});
        $scope.items.push({"name":"袖长","value":"长袖"});
        $scope.items.push({"name":"袖型","value":"常规"});
        $scope.items.push({"name":"领型","value":"娃娃领"});
        $scope.items.push({"name":"衣门襟","value":"单排多扣"});
        $scope.items.push({"name":"图案","value":"纯色"});
        $scope.items.push({"name":"服装款式细节","value":"钉珠"});
        $scope.items.push({"name":"成分含量","value":"96%及以上"});
        $scope.items.push({"name":"质地","value":"棉"});
        $scope.items.push({"name":"年份季节","value":"2015年秋季"});
        $scope.items.push({"name":"颜色分类","value":"藏青色"});

        $scope.users = [];
        $scope.users.push({"headImg":"https://www.google.co.jp/logos/doodles/2015/lucy-maud-montgomerys-141st-birthday-6360410059964416-5092658686984192-rorscta.png", "name":"豆豆茶","content":"嗯 ,衣服很好看,大爱得斯奈."});
        $scope.users.push({"headImg":"https://www.google.co.jp/logos/doodles/2015/lucy-maud-montgomerys-141st-birthday-6360410059964416-5092658686984192-rorscta.png", "name":"豆豆茶","content":"嗯 ,衣服很好看,大爱得斯奈."});
        $scope.users.push({"headImg":"https://www.google.co.jp/logos/doodles/2015/lucy-maud-montgomerys-141st-birthday-6360410059964416-5092658686984192-rorscta.png", "name":"豆豆茶","content":"嗯 ,衣服很好看,大爱得斯奈."});
        $scope.users.push({"headImg":"https://www.google.co.jp/logos/doodles/2015/lucy-maud-montgomerys-141st-birthday-6360410059964416-5092658686984192-rorscta.png", "name":"豆豆茶","content":"嗯 ,衣服很好看,大爱得斯奈."});
        $scope.users.push({"headImg":"https://www.google.co.jp/logos/doodles/2015/lucy-maud-montgomerys-141st-birthday-6360410059964416-5092658686984192-rorscta.png", "name":"豆豆茶","content":"嗯 ,衣服很好看,大爱得斯奈."});

        $scope.jumpsize = function(name,imageUrl,price)  //跳转到选择尺寸颜色页面
        {
            product.setName(name);
            product.setImageUrl(imageUrl);
            product.setPrice(price);
            $state.go('tabs.sizeAndColorStyle');
        }
    })
    //选择颜色尺码页面
    .controller('sizeAndColorStyle',function($scope,product){
        $scope.product=  product;
        $scope.sizes=[];
        $scope.sizes.push('4-155');
        $scope.sizes.push('5-160');
        $scope.sizes.push('6-165');
        $scope.sizes.push('7-170');

        $scope.selectSize = function(selectSize)
        {
            $scope.size = selectSize;
            var oBtn = document.getElementById(selectSize);
            oBtn.style.background="red";
            oBtn.style.textColor="white";

        }
        $scope.colors = [];
        $scope.colors.push('藏青色');
        $scope.number = 0;
        $scope.addNumber = function()
        {
            $scope.number ++;
        };
        $scope.jianNumber = function()
        {
            if($scope.number != 0)
            {
                $scope.number--;
            }
        };

        $scope.fenqis = [];
        $scope.fenqis.push('分3期(含手续费)$1522.18/期');
        $scope.fenqis.push('分6期(含手续费)$1622.18/期');
        $scope.fenqis.push('分9期(含手续费)$1722.18/期');
    })

