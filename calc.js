/////////////////////////////////////////////////////////////////
// Infix -> Postfix -> Eval
/////////////////////////////////////////////////////////////////

function toPost(infix) {
  var opEx = /[\*\/\+\-\(\)]/,
      numEx = /[0-9\.]/;
  var op = [],
      post = [];
  var i = 0;
  var temp;
  while(i<infix.length)
  {
    if (opEx.test(infix[i]))
    {
      if (infix[i]=='*' || infix[i]=='/' || infix[i]=='(')
      {
        op.push(infix[i]);
      }
      else if (infix[i]=='+' || infix[i]=='-')
      {
        temp = op.pop();
        while (temp=='*' || temp=='/')
        {
          post.push(temp);
          temp = op.pop();
        }
        if (temp)
          op.push(temp);
        op.push(infix[i]);
      }
      else if (infix[i]==')')
      {
        var temp = op.pop();
        while (temp!='(')
        {
          post.push(temp);
          temp = op.pop();
        }
      }
      i++;
    }
    else if (numEx.test(infix[i]))
    {
      post.push(infix[i]);
      i++;
      while(numEx.test(infix[i]))
      {
        temp = post.pop();
        if (temp && /[0-9]+(.[0-9]+)?/.test(temp))
        {
          if (temp.length - temp.replace(/\./g,'').length > 1)
            {
              console.log('Incorrect expression arguments');
              return false;
            }
          post.push(temp+infix[i]);
        }
        i++;
      }
    }
    else
    {
      console.log('Incorrect infix expression');
      return false;
    }
  }
  op.reverse();
  for (var j=0;j<op.length;j++)
  {
    post.push(op[j]);
  }
  return post;
}

function evalPost(post) {
  var opEx = /[\*\/\+\-\(\)]/,
      numEx = /[0-9\.]/;
  var stack = [];
  for (var i=0;i<post.length;i++)
  {
    if(numEx.test(post[i]))
      stack.push(post[i]-0);
    else
    {
      var rh = stack.pop()-0,
          lh = stack.pop()-0;
      switch(post[i])
      {
        case '*':
        stack.push(lh*rh);
        break;
        case '/':
        stack.push(lh/rh);
        break;
        case '+':
        stack.push(lh+rh);
        break;
        case '-':
        stack.push(lh-rh);
        break;
      }
    }
  }
  if (stack.length!=1)
  {
    console.log('Incorrect postfix expression');
    return false;
  }
  else
  {
    return stack[0];
  }
}

/////////////////////////////////////////////////////////////////
// Public Methods
/////////////////////////////////////////////////////////////////

module.exports = {
  evaluate: function(exp) {
    var response = evalPost(toPost(exp));
    if (response)
    {
      return response;
    }
    else
    {
      return 'Your expression could not be evaluated';
    }
  }
}