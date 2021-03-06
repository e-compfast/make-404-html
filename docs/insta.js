
(function($){
	var defaults = {
		'username': '',
		'container': '',
		'display_profile': true,
		'display_biography': true,
		'display_gallery': true,
		'get_raw_json': false,
		'callback': null,
		'styling': true,
		'items': 8,
		'items_per_row': 4,
		'margin': 0.5
	};
	$.instagramFeed = function(options){
		options = $.fn.extend({}, defaults, options);
		if(options.username == "" && options.tag == ""){
			console.log("Instagram Feed: Error, no username or tag found.");
			return;
		}	
		if(!options.get_raw_json && options.container == ""){
			console.log("Instagram Feed: Error, no container found.");
			return;
		}
		if(options.get_raw_json && options.callback == null){
			console.log("Instagram Feed: Error, no callback defined to get the raw json");
			return;
		}

		var url = "https://www.instagram.com/"+ options.username;
		$.get(url, function(data){
			data = data.split("window._sharedData = ");
			data = data[1].split("<\/script>");
			data = data[0];
			data = data.substr(0, data.length - 1);
			data = JSON.parse(data);
			data = data.entry_data.ProfilePage[0].graphql.user;
			
			if(options.get_raw_json){
				options.callback(JSON.stringify({
					id: data.id,
					username: data.username,
					full_name: data.full_name,
					is_private: data.is_private,
					is_verified: data.is_verified,
					biography: data.biography,
					followed_by: data.edge_followed_by.count,
					following: data.edge_follow.count,
					'images': data.edge_owner_to_timeline_media.edges,
				}));
				return;
			}
			
			var styles = {
				'profile_container': "",
				'profile_image': "",
				'profile_name': "",
				'profile_biography': "",
				'gallery_image': ""
			};
			if(options.styling){
				styles.profile_container = " style='text-align:center;'";
				styles.profile_image = " style='border-radius:10em;width:15%;max-width:125px;min-width:50px;'";
				styles.profile_name = " style='font-size:1.2em; text-transform:uppercase;'";
				styles.profile_biography = " style='font-size:1em;'";
				var width = (100 - options.margin * 2 * options.items_per_row)/options.items_per_row;
				styles.gallery_image = " style='margin:"+options.margin+"% "+options.margin+"%;width:"+width+"%;float:left; box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);'";
				
			}
			
			var html = "";
			if(options.display_profile){
				html += "	<div class='container'><div class='box'><div class='green'><img class='logo' src='"+ data.profile_pic_url +"' alt='"+ options.username +" profile pic'/></div>";
				html += "	<div class='data'><h1 class='bisnisTitle' style='font-size:1.2em; text-transform:uppercase;'>+"+ data.full_name +"+</h1>";
			}
			
			if(options.display_biography){
				html += "	<span class='instagram_biography'>"+ data.biography +"</span> <div class='data'><div class='view-profile'> <div class='data-profile'> <a class='btn' href='#' id='btn-wa' ><i class='fab fa-facebook-f'> Facebook</i></a> <a class='btn' href='#' id='btn-wa' ><i class='fab fa-instagram'> Instagram</i></a> </div> </div></div </div></div>";
			}
			
			
			
			if(options.display_gallery){
				if(data.is_private){
					html += "<h1 style='text-align:center; font-size: 1rem'><strong>This profile is private</strong></h1>";
				}else{
					var imgs = data.edge_owner_to_timeline_media.edges;
						max = (imgs.length > options.items) ? options.items : imgs.length;
					
					html += "</div><div class='title_head'><h1 class='katalog'>BEST SELLER</h1></div><div class='box flx'><div class='instagram_gallery'>";
					for(var i = 0; i < max; i++){
						var url = "https://www.instagram.com/p/"+ imgs[i].node.shortcode;
						html += "<a href='"+url+"' target='_blank'>";
						html += "	<img src='"+ imgs[i].node.thumbnail_src +"' alt='"+ options.username +" instagram image "+ i+"'"+styles.gallery_image+" />";
						html += "</a>";
					}
					html += "</div></div><div class='footer'><div class='data'><p class='small-text'>"+"&copy; "+data.full_name+ " 2020</p></div></div></div>";
				}
			}
			$(options.container).html(html);
		});
	};
	
})(jQuery);


