from flask import Blueprint, session, jsonify, request

cart_bp = Blueprint('cart_bp', __name__)

def get_cart():
    """Retrieve the cart from session, initialize if empty."""
    return session.get('cart', {})

@cart_bp.route('/cart', methods=['GET'])
def view_cart():
    """View all items in the cart."""
    return jsonify(get_cart())

@cart_bp.route('/cart/add', methods=['POST'])
def add_to_cart():
    """Add a product to the cart."""
    data = request.json
    product_id = str(data.get('product_id'))
    name = data.get('name')
    price = data.get('price')
    quantity = int(data.get('quantity', 1))
    
    if not product_id or not name or price is None:
        return jsonify({"error": "Missing required product details"}), 400
    
    cart = get_cart()
    if product_id in cart:
        cart[product_id]['quantity'] += quantity
    else:
        cart[product_id] = {'name': name, 'price': price, 'quantity': quantity}
    
    session['cart'] = cart
    session.modified = True
    return jsonify({"message": "Product added to cart", "cart": cart})

@cart_bp.route('/cart/update/<product_id>', methods=['PUT'])
def update_cart(product_id):
    """Update quantity of an item in the cart."""
    cart = get_cart()
    if product_id not in cart:
        return jsonify({"error": "Product not in cart"}), 404
    
    data = request.json
    quantity = int(data.get('quantity', 1))
    
    if quantity < 1:
        del cart[product_id]
    else:
        cart[product_id]['quantity'] = quantity
    
    session['cart'] = cart
    session.modified = True
    return jsonify({"message": "Cart updated", "cart": cart})

@cart_bp.route('/cart/remove/<product_id>', methods=['DELETE'])
def remove_from_cart(product_id):
    """Remove a product from the cart."""
    cart = get_cart()
    if product_id in cart:
        del cart[product_id]
        session['cart'] = cart
        session.modified = True
        return jsonify({"message": "Product removed", "cart": cart})
    return jsonify({"error": "Product not found in cart"}), 404

@cart_bp.route('/cart/clear', methods=['DELETE'])
def clear_cart():
    """Clear the entire cart."""
    session.pop('cart', None)
    return jsonify({"message": "Cart cleared"})
