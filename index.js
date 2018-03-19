(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.liteTE = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    var re = /{{(.+?)}}/g, 
		reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g, 
		code = 'var r=[];\n',
		result,
		match,
		htmlArr;
		
	var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
	
	var construct = function(line, js) {
		js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
			(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');			
		return construct;
	}

	var compile = function(html){
		// split entire template into individual lines
		htmlArr = html.split(/[\n\r]/g);
		
		for(var i = 0; i< htmlArr.length; i++) {			
			//check if line is html tag or not
			if(isHTML(htmlArr[i])){				
				//if html then check for '{{}}' expression
				if(htmlArr[i].match(re)) {
					var cursor = 0;
					while(match = re.exec(htmlArr[i])) {
						construct(htmlArr[i].slice(cursor, match.index))(match[1].trim(), true);
						cursor = match.index + match[0].length;					
					}
					construct(htmlArr[i].substr(cursor, html.length - cursor));
				} else {
					
					//if not expression simply concatenate as string
					code = code + 'r.push("' + htmlArr[i] + '");\n';
				}
			} else {				
				// if not html, concatenate as it is
				code = code + htmlArr[i] + '\n';
			}
		}
		
		code = (code + 'return r.join("");').replace(/[\r\t\n]/g, ' ');

		var bindContext = function(context){
			try { 
				result = new Function('obj', code).apply(context, [context]); 
			}
			catch(err) { 
				console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); 
			}
			return result;
		}
		
		return {
			bindContext: bindContext
		};
	}

    return {
        compile: compile
    };
}));