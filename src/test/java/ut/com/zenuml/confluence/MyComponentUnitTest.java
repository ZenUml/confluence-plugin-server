package ut.com.zenuml.confluence;

import org.junit.Test;
import com.zenuml.confluence.api.MyPluginComponent;
import com.zenuml.confluence.impl.MyPluginComponentImpl;

import static org.junit.Assert.assertEquals;

public class MyComponentUnitTest
{
    @Test
    public void testMyName()
    {
        MyPluginComponent component = new MyPluginComponentImpl(null);
        assertEquals("names do not match!", "myComponent",component.getName());
    }
}