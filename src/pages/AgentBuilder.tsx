
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Loader2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface CustomTool {
  id: string;
  name: string;
  description: string;
}

const AgentBuilder = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    agentName: '',
    description: '',
    userEmail: '',
    systemInstructions: 'You are a helpful assistant that...',
    model: 'gpt-4-turbo',
    fileSearch: true,
    codeInterpreter: false,
  });
  
  const [customTools, setCustomTools] = useState<CustomTool[]>([]);
  const [newTool, setNewTool] = useState({ name: '', description: '' });
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-deep-black">
        <Loader2 className="h-16 w-16 animate-spin text-hardcore-pink" />
      </div>
    );
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTool = () => {
    if (newTool.name.trim() && newTool.description.trim()) {
      const tool: CustomTool = {
        id: Date.now().toString(),
        name: newTool.name,
        description: newTool.description,
      };
      setCustomTools(prev => [...prev, tool]);
      setNewTool({ name: '', description: '' });
    }
  };

  const handleRemoveTool = (id: string) => {
    setCustomTools(prev => prev.filter(tool => tool.id !== id));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      if (!tags.includes(currentTag.trim())) {
        setTags(prev => [...prev, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleCreateAgent = async () => {
    if (!formData.agentName.trim() || !formData.description.trim() || !formData.userEmail.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsCreating(true);
    
    try {
      // Here you would typically make an API call to create the agent
      // For now, we'll just simulate the creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Agent created successfully!');
      
      // Reset form
      setFormData({
        agentName: '',
        description: '',
        userEmail: '',
        systemInstructions: 'You are a helpful assistant that...',
        model: 'gpt-4-turbo',
        fileSearch: true,
        codeInterpreter: false,
      });
      setCustomTools([]);
      setTags([]);
      
    } catch (error) {
      toast.error('Failed to create agent. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 px-6 py-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              🔥
            </div>
            <div>
              <h1 className="text-3xl font-bold">Agent Builder</h1>
              <p className="text-gray-300">Create custom OpenAI Assistants with tools and endpoints</p>
            </div>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/agent')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Agent
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Create New Agent</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Agent Name */}
                <div>
                  <Label htmlFor="agentName" className="text-white mb-2 block">
                    Agent Name *
                  </Label>
                  <Input
                    id="agentName"
                    value={formData.agentName}
                    onChange={(e) => handleInputChange('agentName', e.target.value)}
                    placeholder="My Custom Agent"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-white mb-2 block">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe what your agent does..."
                    className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  />
                </div>

                {/* User Email */}
                <div>
                  <Label htmlFor="userEmail" className="text-white mb-2 block">
                    User Email *
                  </Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={formData.userEmail}
                    onChange={(e) => handleInputChange('userEmail', e.target.value)}
                    placeholder="your@email.com"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                {/* Model Selection */}
                <div>
                  <Label className="text-white mb-2 block">Model</Label>
                  <Select value={formData.model} onValueChange={(value) => handleInputChange('model', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* System Instructions */}
                <div>
                  <Label htmlFor="systemInstructions" className="text-white mb-2 block">
                    System Instructions *
                  </Label>
                  <Textarea
                    id="systemInstructions"
                    value={formData.systemInstructions}
                    onChange={(e) => handleInputChange('systemInstructions', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  />
                </div>

                {/* Built-in Capabilities */}
                <div>
                  <Label className="text-white mb-3 block">Built-in Capabilities</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fileSearch"
                        checked={formData.fileSearch}
                        onCheckedChange={(checked) => handleInputChange('fileSearch', checked as boolean)}
                        className="border-gray-600"
                      />
                      <Label htmlFor="fileSearch" className="text-white">File Search</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="codeInterpreter"
                        checked={formData.codeInterpreter}
                        onCheckedChange={(checked) => handleInputChange('codeInterpreter', checked as boolean)}
                        className="border-gray-600"
                      />
                      <Label htmlFor="codeInterpreter" className="text-white">Code Interpreter</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Tools Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Custom Tools</h3>
              
              {/* Add New Tool */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  value={newTool.name}
                  onChange={(e) => setNewTool(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Tool name (e.g., web_search)"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <div className="flex gap-2">
                  <Input
                    value={newTool.description}
                    onChange={(e) => setNewTool(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Tool description"
                    className="bg-gray-800 border-gray-700 text-white flex-1"
                  />
                  <Button
                    onClick={handleAddTool}
                    className="bg-purple-600 hover:bg-purple-700 px-6"
                  >
                    Add Tool
                  </Button>
                </div>
              </div>

              {/* Tools List */}
              {customTools.length > 0 && (
                <div className="space-y-2">
                  {customTools.map((tool) => (
                    <div key={tool.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                      <div>
                        <span className="font-medium text-white">{tool.name}</span>
                        <span className="text-gray-400 ml-2">- {tool.description}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTool(tool.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags Section */}
            <div className="mt-8">
              <Label className="text-white mb-2 block">Tags (press Enter to add)</Label>
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Enter tags..."
                className="bg-gray-800 border-gray-700 text-white mb-3"
              />
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-purple-200 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Create Button */}
            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleCreateAgent}
                disabled={isCreating}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Agent...
                  </>
                ) : (
                  'Create Agent'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBuilder;
