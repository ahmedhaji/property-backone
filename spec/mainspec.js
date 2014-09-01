describe("main",function() {
	
	var router;
	var routeSpy;
	
	beforeEach(function(){
		router = new AppRouter();
		routeSpy = sinon.spy();
		spyOn(collections.properties,'fetch').andCallThrough();
		try {
			Backbone.history.start({silent:true,pushState:true});
		} catch(e){}
		router.navigate("elsewhere");
	});

	afterEach(function(){
	});
	
	describe("AppRouter routes", function() {
		it("should route to Properties to Let screen with blank hash", function() {
			router.on("route:propertiesToLet", routeSpy);

			router.navigate("",{trigger:true});

			expect(routeSpy.callCount).toBe(1);
			expect(collections.properties.fetch).toHaveBeenCalled();
		});
		it("should route to Properties to Let when url is /properties/tolet", function() {
			router.on("route:propertiesToLet", routeSpy);
			router.navigate("/#properties/tolet",{trigger:true});
			expect(routeSpy.callCount).toBe(1);
			expect(collections.properties.fetch).toHaveBeenCalled();
		});
		it("should route to Properties for sale when url is /properties/forsale", function() {
			router.on("route:propertiesToLet", routeSpy);
			router.navigate("/#properties/tolet",{trigger:true});
			expect(routeSpy.callCount).toBe(1);
			expect(collections.properties.fetch).toHaveBeenCalled();
		});
	});
});

