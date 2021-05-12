<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller {
  public function __construct() {
    $this->middleware('auth:sanctum');
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $categories = auth()->user()->categories()->latest()->get();
    return CategoryResource::collection($categories);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $validData = $request->validate([
      'name' => 'required|unique:categories,name,null,id,user_id,' . auth()->id(),
      'description' => 'required',
    ]);

    $category = auth()->user()->categories()->create($validData);

    return new CategoryResource($category);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Category  $category
   * @return \Illuminate\Http\Response
   */
  public function show(Category $category) {
    return new CategoryResource($category);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Category  $category
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Category $category) {
    $validData = $request->validate([
      'name' => 'required|unique:categories,name,' . $category->id . ',id,user_id,' . auth()->id(),
      'description' => 'required',
    ]);

    $category->update($validData);

    return new CategoryResource($category);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Category  $category
   * @return \Illuminate\Http\Response
   */
  public function destroy(Category $category) {
    if ($category->questions()->exists()) {
      $questionCount = count($category->questions);
      $text = $questionCount > 1 ? 'questions belong' : 'question belongs';
      return response([
        'message' => "{$questionCount} {$text} to {$category->name}!",
      ], 422);
    }
    $category->delete();
    return new CategoryResource($category);
  }
}
