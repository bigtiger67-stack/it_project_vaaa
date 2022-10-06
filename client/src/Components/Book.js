import React from "react";

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeletion = this.handleDeletion.bind(this);
    }
    
    handleDeletion() {
        this.props.onDelete(this.props.bookKey);
    }

    render () {
        return (
            <>
            <div className="group relative w-1/6 h-64 place-content-center mb-1">
                <div className="h-48 w-32 flex justify-center items-center overflow-hidden relative">
                    <img src={this.props.image} className="shrink-0 min-h-full min-w-full"alt="book cover" />
                    <div class="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-3xl text-white font-semibold">Edit</div>
                    {/* hover background */}
                    <div className="absolute bg-black w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-80" />
                </div>
                <div className="w-32">
                    <p className="text-stone-100 text-sm break-words line-clamp-2">{this.props.title}</p>
                </div>
                <div className="w-32">
                    <p className="text-stone-300 text-xs break-words line-clamp-1">{this.props.author}</p>
                </div>
            </div>
            </>
          );
    }

}

export default Book;

/* OLD BOOK

            <div className="relative w-32 h-48 place-content-center p-1 text-center">
                <div className="rounded-lg bg-gray-700 shadow-md relative w-auto h-full">
                    <div className="place-content-center">
                        <h5 className="text-gray-200 text-center m-3">{this.props.title}</h5>
                    </div>
                    <button onClick={this.handleDeletion} type="button" className="text-gray-100 text-center bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2">Delete</button>
                    <div className="place-content-center">
                        <a href="/edit">
                            <button type="button" className="text-gray-100 bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 m-2 hover:bg-blue-500">Edit</button>
                        </a>
                    </div>
                </div>

            </div>   

*/

// REMEMBER 'ARE YOU SURE' BUTTON WHEN DELETING